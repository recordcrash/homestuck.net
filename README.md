# Homestuck.net



![Homestuck.net homepage](https://github.com/recordcrash/homestuck.net/blob/master/img/homestuck-net-embed.png?raw=true)

[![Deploy Homestuck.net](https://github.com/recordcrash/homestuck.net/actions/workflows/main.yml/badge.svg)](https://github.com/recordcrash/homestuck.net/actions/workflows/main.yml)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/recordcrash/homestuck.net?style=flat-square)](https://github.com/recordcrash/homestuck.net/commits/master)
[![Last Commit](https://img.shields.io/github/last-commit/recordcrash/homestuck.net?style=flat-square)](https://github.com/recordcrash/homestuck.net/commits/master)
[![Homestuck Discord](https://img.shields.io/discord/152981670507577344?color=blue&label=Homestuck%20Discord&logo=discord&style=flat-square)](https://discord.gg/homestuck)

This is the static source of the website https://homestuck.net, the Homestuck fandom's archive.

## Table of Contents

- [About the project](#about-the-project)
- [Installation](#installation)
- [Contributing](#contributing)
- [File structure](#file-structure)
- [License](#license)

## About the project

Homestuck.net is a static website that serves as an archive for the Homestuck fandom and overall franchise. The archive is composed of a variety of HTML pages that link to audio, video, images, and text that the Homestuck fandom wants to preserve. Homestuck is a webcomic created by Andrew Hussie that was popular during the mid-2010s. The webcomic has a large and active fandom, and the Homestuck.net archive is an effort to preserve and celebrate their creative footprint.

The archive was created by a group of volunteers who are passionate about preservation. It includes fan art, fan fiction, music, cosplay, and other creative works. We welcome contributions from anyone who is interested in helping archive fanworks. 

## Installation

To install this project on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/recordcrash/homestuck.net.git`
2. Navigate to the project directory: `cd homestuck.net`
3. Open the `index.html` file in your web browser.

## Contributing

If you'd like to contribute "code" to this project, you can do so by submitting a pull request. Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin your-feature-name`
5. Submit a pull request

If you only want to contribute content, i.e. you're a fan artist, a developer, a writer or a musician who wants to archive their work, or even a fan who wants to preserve someone else's, please contact homestucknet@protonmail.

## File structure

The Homestuck.net project has the following file structure (some unimportant files and easter eggs excepted):

```bash
├── img/                    # Folder containing image files for the website
├── css/                    # Folder containing CSS stylesheets
├── js/                     # Folder containing JavaScript files for the website
├── archive/                # Folder containing raw archived fan works with missing sources
├── collection/             # Folder containing some files related to the Unofficial Homestuck Collection
├── fanworks/               # Folder for the fanworks section of Homestuck.net
├── games/                  # Folder for the games section of Homestuck.net
├── official/               # Folder for the official works section of Homestuck.net
├── meta/                   # Folder for the meta (theories, statistics, etc.) section of Homestuck.net
├── music/                  # Folder for the music section of Homestuck.net
├── resources/              # Folder for the fan resources section of Homestuck.net 
├── tools/                  # Folder for the tools section of Homestuck.net
├── about.html              # About page of the website
├── archives.html           # Page for the Homestuck Archive, the torrent with raw fanworks
├── companion.html          # Page for Homestuck Companion, the book commentary browser extension
├── contact.html            # Contact page for the Homestuck.net project
├── homestuck.html          # Page for new fans, which explains what Homestuck is and how to read it
├── index.html              # The front page of Homestuck.net
├── pesterchum.html         # Page for Pesterchum, the Homestuck chat application
├── template.html           # (Semi-outdated) HTML template used for other pages
├── thehomestuckarchives.torrent  # Torrent file containing an archive with bigger files
├── toblerones.html         # Page for Hussie's toblerone hunt (long story)
├── README.md               # Readme file for the project (you're reading it, chatGPT helped make it)
├── LICENSE                 # License information for the project (it's MIT)
```

This project has no header or footer pages, it's all raw HTML. This has been chosen to make individual html pages usable, but in retrospect it makes things harder to maintain and we should have gone with static site generation (possible approach soon?). For now, if you want to contribute and need to submit a new page, make sure it follows the structure of all other pages.

## License

This project is released under the MIT license, which means you can do whatever you want with it, even create your own fandom archive under your own name. However, please note that all fan content belongs to the original authors to the extent the concept applies to derivative works.
