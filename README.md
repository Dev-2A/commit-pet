# 🐾 Commit Pet

GitHub 커밋 활동으로 성장하는 도트 캐릭터.

<p align="center">
  <img src="./commit-pet.svg" alt="commit-pet" />
</p>

## 🎮 소개

매일 커밋하면 펫이 성장하고, 커밋을 안 하면 배고파하거나 잠들어요.
GitHub Actions가 매일 자동으로 펫 상태를 업데이트합니다.

## 🐣 성장 단계

| 단계 | 조건 | 모습 |
| ------ | ------ | ------ |
| 🥚 알 | 주간 커밋 0 | 아직 태어나지 않은 알 |
| 🐣 아기 | 주간 커밋 1~9 | 갓 태어난 아기 펫 |
| 🐥 청소년 | 주간 커밋 10~29 | 쑥쑥 자라는 중 |
| 🐔 성체 | 주간 커밋 30+ | 완전히 성장한 펫 |

## 😊 기분 상태

| 기분 | 조건 |
| ------ | ------ |
| 😆 신남 | 오늘 커밋 3개 이상 |
| 🙂 보통 | 오늘 커밋 1~2개 |
| 😿 배고픔 | 오늘 커밋 0개 (연속 유지 중) |
| 😴 잠듦 | 오늘 커밋 0개 (연속 끊김) |

## 🛠️ 직접 사용하기

### 1. 레포지토리 Fork

이 레포를 Fork하세요.

### 2. GitHub Token 설정

1. [Personal Access Token](https://github.com/settings/tokens) 생성 (`read:user` 권한)
2. Fork한 레포 → **Settings** → **Secrets and variables** → **Actions**
3. `PET_GITHUB_TOKEN` 이름으로 토큰 등록

### 3. Actions 활성화

Fork한 레포의 **Actions** 탭에서 워크플로우를 활성화하세요.
**Run workflow**로 수동 실행하거나, 매일 자동으로 업데이트됩니다.

### 4. 다른 레포 README에 넣기 (선택)

프로필 README 등 다른 곳에 펫을 표시하고 싶다면:

```html
<img src="https://raw.githubusercontent.com/본인계정/commit-pet/main/commit-pet.svg" alt="commit-pet" />
```

## 📁 프로젝트 구조

```text
commit-pet/
├── .github/workflows/   GitHub Actions 워크플로우
├── src/
│   ├── sprites/          도트 스프라이트 데이터
│   ├── github.js         GitHub API 연동
│   ├── pet.js            펫 상태 엔진
│   ├── renderer.js       SVG 렌더러
│   ├── writer.js         파일 저장
│   └── index.js          메인 스크립트
├── test/                 테스트 스크립트
└── output/               SVG 출력 디렉토리
```

## 🧑‍💻 로컬 실행

```bash
git clone https://github.com/Dev-2A/commit-pet.git
cd commit-pet
npm install
```

`.env` 파일을 생성하세요:

```env
GITHUB_TOKEN=ghp_본인토큰
GITHUB_USERNAME=Dev-2A
```

```bash
npm start
```

## 📄 라이선스

MIT License © [Dev-2A](https://github.com/Dev-2A)
