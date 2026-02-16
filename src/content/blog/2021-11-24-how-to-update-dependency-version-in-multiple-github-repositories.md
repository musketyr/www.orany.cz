---
title: "How to Update Dependency Version in Multiple GitHub Repositories"
date: 2021-11-24
slug: how-to-update-dependency-version-in-multiple-github-repositories
source: medium
mediumId: "512b18f5c909"
---There are many tools that can help you keep your repositories up to date like a Dependabot but if you need to keep the control in your…

* * *

### How to Update Dependency Version in Multiple GitHub Repositories

![](https://cdn-images-1.medium.com/max/800/1*rbF5dZVoTEtOcVIrHvhGFg.png)

There are many tools that can help you keep your repositories up to date like a [Dependabot](https://github.com/dependabot) but if you need to keep the control in your hands then you need to do the update yourself. But updating to the latest version possible once it's released is not always an option. Let's take an example of excellent test support library [Testcontainers](https://www.testcontainers.org). We'll use the Pierrot command line interface to perform the migration.

[**Pierrot - Multi-repository GitHub Governance Tool**](https://agorapulse.github.io/pierrot/)https://agorapulse.github.io/pierrot/)

Pierrot can be installed using [SDKMAN](https://sdkman.io).

[**Home - SDKMAN! the Software Development Kit Manager**](https://sdkman.io)https://sdkman.io)

```
# if you don't have SDKMAN already installedcurl -s "https://get.sdkman.io" | bashsource "$HOME/.sdkman/bin/sdkman-init.sh"
```

```
# install pierrot
```

_If you can't see_ `_pierrot_` _candidate you need to either run the update command_ `_sdk update_` _or if you have disabled_ [_Rosetta Compatibility_](https://sdkman.io/usage#config) _then you need to enable it again_ `_sdkman_rosetta2_compatible=true_`_._

Once installed you should be able to run the command and get the list of available actions:

Pierrot requires [GitHub token to access the repositories](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and you should also set up the organization to search, so you don't have to repeat these in every call.

[**Creating a personal access token - GitHub Docs**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

```
export GITHUB_TOKEN=yourtoken
export GITHUB_ORGANIZATION=yourorganization
```

Now we can start searching inside the Gradle files, our build system of choice.

```
pierrot search extension:gradle testcontainers
```

The search term is based on the [GitHub content search syntax](https://docs.github.com/en/search-github/searching-on-github/searching-code).

[**Searching code - GitHub Docs**](https://docs.github.com/en/search-github/searching-on-github/searching-code)https://docs.github.com/en/search-github/searching-on-github/searching-code)

We will get a pageable list of results such as this one:

If we are happy with the results that they contain all the files we're interested in then we can actually download them using the `pull` command:

```
mkdir testcontainers-1.16.3-upgrade
cd testcontainers-1.16.3-upgrade
```

```
pierrot pull -P extension:gradle testcontainers
```

_Using_ `_-P_` _we disable pagination so all the files will be fetched at once._

You can see that archived repositories are ignored. The files will be pulled in the following layout:

The first directory stands for the organization and the second for the repository where the file is located. The paths follow the original location in the repositories.

We can also delete the directories for the repositories we don't want to include in the update.

Most of the files are using the Testcontainers' version from the `gradle.properties` file. We need to pull them as well.

We can limit the pull command to current repositories using the `--workspace-repositories-only` flag which is very useful for incremental updates.

```
pierrot pull \
  --workspace-repositories-only \
  filename:gradle.properties
```

The directory will now contain the following files:

Sadly, the `filename` match also downloaded some extra `gradle-wrapper.properties` files. We don't want to change them so we should also delete them from the workspace.

Now, we can open the directory in the favorite IDE or just text editor and make the changes we need to perform the migration. The desired outcome is to:

1.  ensure that every project is using a placeholder in the build files
2.  update the version in configuration files to the latest one

I'm using IntelliJ IDEA to perform the changes. Replacing the version is pretty straightforward.

![](https://cdn-images-1.medium.com/max/800/1*QO9txlIY9dHoEe9NyFzIag.png)

Once the changes are done then we can `push` them back to GitHub.

```
pierrot push \
 --project "Testcontainers 0.16.2" \
 --branch=chore/upgrade-testcontainers-0.16.2 \
 --title="Upgraded Testcontainers to 0.16.2" \
 --message="Upgraded Testcontainers to 0.16.2 to enable M1"
```

You will see a log of changes being pushed and PRs being open:

Using `--project` you can create a project (board) on the organization level to track all the pull requests that have been created.

![](https://cdn-images-1.medium.com/max/800/1*rbacVNtB2hhsXQ5ruBRc5A.png)

You can set up the automation manually to let GitHub move the pull request into particular columns once their status changes.

Now when you have kickstarted the changes you will have to handle the pull requests one by one.

For the next time, we can actually skip pulling the changes locally and use the `replace` command

```
pierrot replace \
 --pattern='testcontainersVersion = .*' \
 --replacement='testcontainersVersion = 3.1.0' \
 --project "Testcontainers 0.16.3" \
 --branch=chore/upgrade-testcontainers-0.16.3 \
 --title="Upgraded Testcontainers to 0.16.3" \
 --message="Upgraded Testcontainers to 0.16. to enable M1" \
 filename:gradle.properties testcontainersVersion
```

This command uses Java regular expression pattern to replace any version number with the latest one.

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 24, 2021](https://medium.com/p/512b18f5c909).

[Canonical link](https://medium.com/@musketyr/how-to-update-dependency-version-in-multiple-github-repositories-512b18f5c909)

Exported from [Medium](https://medium.com) on February 15, 2026.