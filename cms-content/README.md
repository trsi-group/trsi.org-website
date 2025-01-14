# Contentful Export Tool

This script exports all content and assets from Contentful, and transforms the content for consumption by app.js to build the site. Currenty it only support data for our productions.

1. copy ```example_config.json``` to ```config.json``` and add the Contentful API secrets.

2. execute script from /cms-content dir.

```
node ./transform-content.js productions.json ./export/
```

3. Copy transformed export data and image assets.

```
cp export/productions.json ../data/ \
cp export/images/* ../images/productions/
```

## additional info

- [Installing Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/installation/)
- [Authentication with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/authentication/)
- [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

