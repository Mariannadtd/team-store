import './about.css';

interface TeamMember {
  name: string;
  role: string;
  githubNickname: string;
  githubUrl: string;
  contribution: string;
}

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

export function renderAboutPage(): HTMLElement {
  const container = createElement('div', 'about-container');

  const heroSection = createElement('section', 'hero-about');
  const title = createElement('h1', 'about-title', 'About us...');
  const subtitle = createElement(
    'p',
    'about-subtitle',
    'Welcome to [Shop Name], your online destination for classic and vintage mobile phones. From iconic 90s bricks and durable Nokias to the unmistakable flip phones of the 2000s, we curate the handhelds that defined a generation. Whether you’re a collector, looking for a digital detox, or simply miss the satisfying snap of a flip phone, we bring retro mobile tech straight to your door.',
  );
  heroSection.append(title, subtitle);

  const teamSection = createElement('section', 'team-about');
  const teamHeading = createElement('h2', '', 'Meet our Team');
  const teamGrid = createElement('div', 'team-grid');

  const members: TeamMember[] = [
    {
      name: 'Marina Romanova',
      role: 'Lead Frontend Developer',
      githubNickname: 'Mariannadtd',
      githubUrl: 'https://github.com/Mariannadtd',
      contribution: 'Task distribution, Products page',
    },
    {
      name: 'Vladislavs Bratusevs',
      role: 'Frontend Developer',
      githubNickname: 'vladBratu5evs',
      githubUrl: 'https://github.com/vladBratu5evs',
      contribution: 'About page, Header section',
    },
  ];

  members.forEach((member) => {
    const memberItem = createElement('div', 'grid-item');
    const nameItem = createElement('h3', '', member.name);

    const detailsList = createElement('ul', '');
    const roleItem = createElement('li', '', `Role: ${member.role}`);

    const gitHubItem = createElement('li', '', 'GitHub: ');
    const gitHubLink = createElement('a', '', member.githubNickname);
    gitHubLink.href = member.githubUrl;
    gitHubLink.target = '_blank';
    gitHubLink.rel = 'noopener noreferrer';
    gitHubItem.append(gitHubLink);

    const contributionItem = createElement('li', '', `Contributions: ${member.contribution}`);

    detailsList.append(roleItem, gitHubItem, contributionItem);
    memberItem.append(nameItem, detailsList);
    teamGrid.append(memberItem);
  });
  teamSection.append(teamHeading, teamGrid);

  container.append(heroSection, teamSection);
  return container;
}
