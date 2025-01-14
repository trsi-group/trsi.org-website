# Contentful Export Tool

This script exports all content and assets from Contentful, and transforms the content for consumption by app.js to build the site. Currenty it only support data for our productions.

```
node ./transform-content.js productions.json ./export/
```

Copy transformed export data and image assets.

```
cp export/productions.json ../data/ \
cp export/images/* ../images/productions/
```

## additional info

- [Installing Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/installation/)
- [Authentication with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/authentication/)
- [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

