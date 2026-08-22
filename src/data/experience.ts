export interface ExperienceEntry {
  /** e.g. "03.2024 — Present". Rendered in the timeline rail. */
  period: string;
  role: string;
  company: string;
  /** Optional — omit to hide. e.g. "İstanbul · Hybrid" */
  location?: string;
  /** 2–4 short, outcome-focused bullets read best. */
  highlights: string[];
  /** Shown as chips under the bullets. */
  stack: string[];
}

/**
 * Software roles only, most recent first. The full history — including the
 * swimming-instructor and insurance claims roles that predate the move into
 * QA — is in the downloadable CV.
 */
export const experience: ExperienceEntry[] = [
  {
    period: '03.2024 — Present',
    role: 'QA Automation Engineer',
    company: 'Mars Athletic Club',
    location: 'İstanbul',
    highlights: [
      'Own live monitoring during cross-team production releases, providing rapid incident triage through go-lives.',
      'Track real-time production errors with Sentry and Grafana, and became the go-to person for live-incident troubleshooting and root-cause analysis.',
      'Shifted critical regression scenarios into automation, raising release confidence and cutting manual verification effort.',
      'Apply BDD with Selenium-Cucumber, Katalon Studio and Playwright (TypeScript), keeping suites maintainable through the Page Object Model.',
      'Validate APIs with Postman and automate critical flows with REST Assured against Swagger specifications.',
    ],
    stack: [
      'Playwright',
      'TypeScript',
      'Selenium',
      'Cucumber',
      'REST Assured',
      'Sentry',
      'Grafana',
    ],
  },
  {
    period: '09.2023 — 03.2024',
    role: 'Software Tester',
    company: 'TransPerfect',
    location: 'Contract',
    highlights: [
      'Manual functional testing and localisation QA against common acceptance criteria.',
    ],
    stack: ['Manual Testing', 'Localisation QA'],
  },
  {
    period: '07.2023 — 10.2023',
    role: 'Software Tester',
    company: 'Roombadi',
    location: 'Contract',
    highlights: [
      'Manual API and UI testing, alongside a dedicated test automation framework built for the product.',
    ],
    stack: ['Manual Testing', 'API Testing', 'Java'],
  },
  {
    period: '04.2023 — 09.2023',
    role: 'Software Tester',
    company: 'Crocus Media',
    location: 'Contract',
    highlights: ['Manual API and UI testing across the product surface.'],
    stack: ['Manual Testing', 'API Testing'],
  },
  {
    period: '06.2022 — 06.2023',
    role: 'Software Tester',
    company: 'Library Project',
    highlights: [
      'Worked to Agile methodology and Scrum ceremonies, building test cases from user stories and acceptance criteria.',
      'Implemented a BDD Selenium-Cucumber framework with Maven and the Page Object Model, then kept the automated suite aligned with each software update.',
      'Processed issues with black-box techniques before automation coverage was in place.',
    ],
    stack: ['Selenium', 'Cucumber', 'Java', 'Maven', 'Agile / Scrum'],
  },
  {
    period: '08.2021 — 04.2022',
    role: 'Software Tester',
    company: 'Conversation24 — Cobrowser',
    highlights: [
      'Ran manual UI and API tests to specification plus exploratory testing for customer support and call-centre flows.',
      'Automated UI tests with Selenium WebDriver and TestNG in Java, and tested APIs manually with Postman.',
      'Filed bug reports across functional, visual, content and crash categories; extracted issue content programmatically with Apache POI.',
    ],
    stack: ['Selenium', 'TestNG', 'Java', 'Postman', 'Apache POI'],
  },
];
