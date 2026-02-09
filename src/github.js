import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;

const GRAPHQL_URL = "https://api.github.com/graphql";

/**
 * GitHub GraphQL API로 기여 캘린더 조회
 * @param {number} days - 조회할 일수 (기본 7일)
 * @returns {Promise<{ total: number, today: number, streak: number }>}
 */
export async function getCommitStats(days = 7) {
  const from = new Date();
  from.setDate(from.getDate() - days);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
        to: new Date().toISOString(),
      },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  const calendar = json.data.user.contributionsCollection.contributionCalendar;

  // 날짜별 기여 수를 평탄화
  const days_flat = calendar.weeks.flatMap((w) => w.contributionDays);

  // 오늘 날짜 (로컬 기준)
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayData = days_flat.find((d) => d.date === todayStr);
  const today = todayData?.contributionCount || 0;

  // 총 기여 수
  const total = calendar.totalContributions;

  // 연속 기여 일수 (streak) — 오늘부터 거슬러 올라감
  const streak = calcStreak(days_flat);

  return { total, today, streak };
}

/**
 * 연속 기여 일수 계산
 */
function calcStreak(days_flat) {
  // 날짜 내림차순 정렬
  const sorted = [...days_flat].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  let streak = 0;
  for (const day of sorted) {
    if (day.contributionCount > 0) {
      streak++;
    } else {
      // 오늘이 0이면 어제부터 세기 시작 (아직 커밋 안 한 경우)
      if (streak === 0) continue;
      break;
    }
  }

  return streak;
}
