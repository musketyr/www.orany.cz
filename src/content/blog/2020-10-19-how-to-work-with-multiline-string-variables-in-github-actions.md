---
title: "How to Work with Multiline String Variables in GitHub Actions"
date: 2020-10-19
slug: how-to-work-with-multiline-string-variables-in-github-actions
source: medium
mediumId: "23f56447d209"
---GitHub Actions are a great tool for automation. I'm currently creating workflows to manage changelog for a BOM file based on releases of…

* * *

### How to Work with Multiline String Variables in GitHub Actions

![](https://cdn-images-1.medium.com/max/800/1*3Op7PvhoJq3M4H2uIwo9tw.png)

GitHub Actions are a great tool for automation. I'm currently creating workflows to manage changelog for a BOM file based on releases of included. On the library side, I was sending a `release`payload as a part of `repository_dispatch` action and then I wanted to add it to the changelog.

sed -i "2 a### $description\\n\\n$release\_body\\n" CHANGELOG.md

The problem was how to populate the `request_body` variable. The obvious option would be to extract the value from the event using `${{ ... }}` notation. The problem with this notation is that it is basically a pure text replacement so the multiline string would break bash command as well as the workflow YAML file

env:  
  release\_body: this would be a multine string  
and break the syntax...

For this particular situation of reading the event, one can luckily use the `jq` and read the JSON which as also stored in the filesystem.

export release\_body=$(jq '.client\_payload.github.event.release.body' $GITHUB\_EVENT\_PATH)  
release\_body="${release\_body%\\"}"  
release\_body="${release\_body#\\"}"

The variable will be surrounded by double-quotes so you also need to remove the first and last double-quote.

For other situations, passing the value through the filesystem seems the only way to go.

Another problem may arise if you want to create an output from the action. When the changelog is changed then I wanted to draft a new release using a part of the changelog. You can create step's output as follows:

export CHANGELOG="$(...)"  
echo "::set-output name=changelog::$(echo "$CHANGELOG")"

Again, the multiline strings are not properly handled for these situations. You need to sanitize the content first:

export CHANGELOG="$(...)"  
CHANGELOG="${CHANGELOG//'%'/'%25'}"  
CHANGELOG="${CHANGELOG//$'\\n'/'%0A'}"  
CHANGELOG="${CHANGELOG//$'\\r'/'%0D'}"  
echo "::set-output name=changelog::$(echo "$CHANGELOG")"

Then the output is read correctly in the next steps — no need to other replacements in the consumer step.

By [Vladimír Oraný](https://medium.com/@musketyr) on [October 19, 2020](https://medium.com/p/23f56447d209).

[Canonical link](https://medium.com/@musketyr/how-to-work-with-multiline-string-variables-in-github-actions-23f56447d209)

Exported from [Medium](https://medium.com) on February 15, 2026.