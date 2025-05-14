<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/IsinBlockchainTeam/azle-typed-design-demo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">azle-typed-design-demo</h3>

  <p align="center">
    💡 A practical showcase of a clean, powerful type-driven design pattern for Azle canisters on the Internet Computer. Simplify development, enhance maintainability, and unleash the power of TypeScript types in your ICP projects.
    <br />
    <a href="https://github.com/IsinBlockchainTeam/azle-typed-design-demo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/IsinBlockchainTeam/azle-typed-design-demo">View Demo</a>
    ·
    <a href="https://github.com/IsinBlockchainTeam/azle-typed-design-demo/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/IsinBlockchainTeam/azle-typed-design-demo/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#specifications">Specifications</a></li>
        <ul>
          <li><a href="#domain-models">Domain models</a></li>
          <li><a href="#architecture-components">Architecture components</a></li>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
  <img src="https://raw.githubusercontent.com/IsinBlockchainTeam/azle-typed-design-demo/main/images/demo.gif" alt="animated" height="500"/>
</p>
<!-- [![Product Name Screen Shot][product-screenshot]](https://github.com/IsinBlockchainTeam/azle-typed-design-demo) -->

This repository demonstrates an architecture for effective model management in medium-sized Azle projects on the Internet Computer. It showcases a structured approach to organizing, accessing, and manipulating data models that remains maintainable as projects grow.
Key features include:

- Organized data model structures and relationships
- Separation of models from business logic
- Type-safe model definitions with validation
- Consistent persistence strategies
- Efficient query and filtering patterns

This implementation addresses common challenges in growing Azle applications by providing clear patterns for working with persistent state while maintaining code clarity and performance.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This demo is built mainly using the following technologies:

[![ICP][ICP]][ICP-url]

[![Azle][Azle]][Azle-url]

[![TypeScript][TypeScript]][TypeScript-url]

[![React][React]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Specifications

This demo project illustrates a model management architecture for Azle applications through a simple business domain with visibility control patterns. The architecture demonstrates how to efficiently organize, transform, and present data across different system layers.

#### Domain models

The project is built around two primary models:

- Employee: Represents an individual person with associated attributes
- Company: Represents an organization containing employees
  - FullCompany: Complete visibility of company data including employee details
  - RestrictedCompany: Limited visibility showing only employee count without detailed information

#### Architecture components

The project architecture follows a layered approach with clear separation of concerns:

- Entities: Core domain objects used within the backend and occasionally in frontend logic
- Persistences: Specialized forms of entities optimized for stable memory storage
- DTOs (Data Transfer Objects): Entity representations compatible with the Candid interface
- IDLs: DTO definitions converted into Candid types for Internet Computer compatibility
- Presentations: Shaped entities specifically designed for frontend consumption
- Interfaces: Common type definitions and contracts shared across the system
- Factories: Creation patterns for complex entities, particularly those implementing visibility levels

This architecture provides a structured approach to handling data as it flows through different parts of the system, ensuring type safety, proper data transformation, and appropriate visibility controls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get started with the azle-typed-design-demo, please refer to our setup guide and installation
instructions in the documentation section. We provide step-by-step guidelines to help you run the demo into
your machine effectively.

### Prerequisites

Before diving into the azle-typed-design-demo, ensure you have the necessary environment and tools set up as
listed below.

- [Node.js][Node-installation-url]
- [ICP][ICP-installation-url] (version 0.26.1)
- [Azle][Azle-installation-url]

### Installation

Follow these steps to seamlessly incorporate the azle-typed-design-demo into your development environment.

1. Clone the repo
   ```sh
   git clone https://github.com/IsinBlockchainTeam/azle-typed-design-demo.git
   ```
2. Install packages
   ```sh
   npm install
   ```
3. Copy the .env.example file to .env
   ```sh
   cp src/frontend/.env.example src/frontend/.env
   ```
4.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To run the azle-typed-design-demo, follow these steps:

1. Start the local replica
   ```sh
   dfx start --clean
   ```
2. Deploy canisters
   ```sh
   dfx deploy
   ```
3. If you want to host frontend on your local machine, run
   ```sh
   dfx deploy backend
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/IsinBlockchainTeam/azle-typed-design-demo/issues) for a full
list of proposed
features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- [Tommaso Agnola](https://www.linkedin.com/in/tommaso-agnola-882146261/) - tommaso.agnola@supsi.ch
- [Lorenzo Ronzani](https://www.linkedin.com/in/lorenzo-ronzani-658311186/) - lorenzo.ronzani@supsi.ch
- [Mattia Dell'Oca](https://www.linkedin.com/in/mattia-dell-oca/) - mattia.delloca@supsi.ch

Project
Link: [azle-typed-design-demo](https://github.com/IsinBlockchainTeam/azle-typed-design-demo)

Organization Link: [IsinBlockchainTeam](https://github.com/IsinBlockchainTeam)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites
to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [Flat Icon](https://www.flaticon.com/free-icons/digital-wallet)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/IsinBlockchainTeam/azle-typed-design-demo.svg?style=for-the-badge
[contributors-url]: https://github.com/IsinBlockchainTeam/azle-typed-design-demo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/IsinBlockchainTeam/azle-typed-design-demo.svg?style=for-the-badge
[forks-url]: https://github.com/IsinBlockchainTeam/azle-typed-design-demo/network/members
[stars-shield]: https://img.shields.io/github/stars/IsinBlockchainTeam/azle-typed-design-demo.svg?style=for-the-badge
[stars-url]: https://github.com/IsinBlockchainTeam/azle-typed-design-demo/stargazers
[issues-shield]: https://img.shields.io/github/issues/IsinBlockchainTeam/azle-typed-design-demo.svg?style=for-the-badge
[issues-url]: https://github.com/IsinBlockchainTeam/azle-typed-design-demo/issues
[license-shield]: https://img.shields.io/github/license/IsinBlockchainTeam/azle-typed-design-demo.svg?style=for-the-badge
[license-url]: https://github.com/IsinBlockchainTeam/azle-typed-design-demo/blob/master/LICENSE.txt
[product-screenshot]: images/demo.gif
[ICP]: https://img.shields.io/badge/Internet_Computer-3B00B9?style=for-the-badge
[ICP-url]: https://internetcomputer.org/
[Azle]: https://img.shields.io/badge/Azle-1A365D?style=for-the-badge
[Azle-url]: https://github.com/demergent-labs/azle
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[React]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black
[React-url]: https://reactjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Node-installation-url]: https://nodejs.org/en/download
[ICP-installation-url]: https://internetcomputer.org/docs/building-apps/getting-started/quickstart
[Azle-installation-url]: https://demergent-labs.github.io/azle/installation.html
