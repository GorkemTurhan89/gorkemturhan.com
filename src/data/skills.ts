export interface SkillGroup {
  title: string;
  /** One-line description of what this group covers. */
  summary: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Test Automation',
    summary: 'End-to-end and UI coverage, built on the Page Object Model.',
    items: [
      'Playwright',
      'Selenium',
      'Cucumber (BDD)',
      'Katalon Studio',
      'TestNG / JUnit',
      'Appium',
    ],
  },
  {
    title: 'Languages & Data',
    summary: 'What the frameworks and the queries are written in.',
    items: ['TypeScript', 'Java', 'JavaScript', 'C#', 'Groovy', 'SQL'],
  },
  {
    title: 'API & Performance',
    summary: 'Verification pushed below the UI, where it runs fast.',
    items: ['API Testing', 'REST Assured', 'Postman', 'Swagger', 'JMeter'],
  },
  {
    title: 'Process & Observability',
    summary: 'Shipping the suite, then watching what it ships.',
    items: [
      'Manual Testing',
      'Agile / Scrum',
      'Git / GitHub',
      'CI/CD',
      'Jira / X-ray',
      'Sentry',
      'Grafana',
    ],
  },
];
