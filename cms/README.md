# CMS (Contentful) Tooling

This bundles all the code and data for pulling and transforming content managed in [Contentful](https://app.contentful.com/).

[Contentful CLI](https://github.com/contentful/contentful-cli/tree/main/docs/space/export) allows to export a set of content types and assets, using configuration in ```config.json```. API tokens for Contentful access need to be configured in ```.env```. 

```scripts``` contains various helper modules for fetching content and processing the JSON and assets export.

Run ```npm run build``` to pull latest content, and transform images and JSON to site specific requirements. The front end code pulls JSON data for each content type from the defined export targets. Image assets get optiomizes by conversion to webp format and resize to for specific use cases (e.g. card).

With Vite, the ```vite.config.js``` setup copies all processed data in the ```cms``` folder (e.g. data, images) to the ```dist``` folder. ```.gitignore``` rules exist to avoid checking in any of the CSM data.

## additional info

- [Installing Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/installation/)
- [Authentication with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/authentication/)
- [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

