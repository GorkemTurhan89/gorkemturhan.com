export interface Project {
  title: string;
  description: string;
  technologies: string[];
  /** Omit to hide the "Code" link. */
  github?: string;
  /** Omit to hide the "Live demo" link. */
  demo?: string;
  /** Renders a small badge in the card corner, e.g. "Open source". */
  badge?: string;
}

export interface ProjectGroup {
  title: string;
  summary: string;
  projects: Project[];
}

const GH = 'https://github.com/GorkemTurhan89';

/**
 * These descriptions were written from each repository's actual structure
 * (build files, config, folder layout) rather than from a README, since most
 * of the repos do not have one. Tighten the wording — and add a README to the
 * repos themselves — as you polish them; this file is the only place the
 * cards are defined.
 *
 * `github` and `demo` are both optional: leave one out and its link simply
 * disappears from the card.
 */
export const projectGroups: ProjectGroup[] = [
  {
    title: 'QA Projects',
    summary: 'Test frameworks and automation harnesses.',
    projects: [
      {
        title: 'Playwright E2E Suite',
        description:
          'End-to-end tests in Playwright and TypeScript, with the runner configured through playwright.config.ts and the suite wired into a GitHub Actions workflow so it runs on every push.',
        technologies: ['Playwright', 'TypeScript', 'GitHub Actions'],
        github: `${GH}/playwrightTutorial`,
        badge: 'CI enabled',
      },
      {
        title: 'Trendyol Automation Framework',
        description:
          'A Java and Maven UI automation project targeting the Trendyol e-commerce flows, with environment settings kept out of the code in an external properties file.',
        technologies: ['Java', 'Maven', 'Selenium'],
        github: `${GH}/Trendyol`,
      },
      {
        title: 'Roombadi Test Framework',
        description:
          'The test automation framework built during the Roombadi engagement — a standalone Java module covering the product’s API and UI flows.',
        technologies: ['Java', 'Selenium', 'API Testing'],
        github: `${GH}/RoomBadi`,
      },
      {
        title: 'Mobile Automation Sandbox',
        description:
          'Appium experiments in Java: driver setup, locator strategies and gesture handling for native mobile flows, kept as a reference for mobile coverage.',
        technologies: ['Appium', 'Java'],
        github: `${GH}/appiumTry`,
      },
    ],
  },
  {
    title: 'Development Projects',
    summary: 'What I build when I am not writing tests.',
    projects: [
      {
        title: 'Pivot — Payment Plan CRM',
        description:
          'An ASP.NET Core MVC application for managing payment plans and related services. Full stack: controllers, domain models and Razor views over an Entity Framework data layer with versioned migrations — the project where I work on the other side of the API I usually test.',
        technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'MVC', 'SQL'],
        github: `${GH}/pivot`,
        badge: 'Active',
      },
    ],
  },
];
