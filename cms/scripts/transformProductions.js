import { resolve } from 'path';

/**
 * Transforms Contentful JSON export to the target simplified format.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 * @returns {Object} The transformed JSON.
 */
export function transformProductions(contentfulData) {
  const { entries, assets } = contentfulData;

  // Helper to find asset by ID and resolve the local path
  const findAssetPathById = (assetId) => {
    const asset = assets.find((a) => a.sys.id === assetId);
    if (asset && asset.fields.file && asset.fields.file['en-US']) {
      return asset.fields.file['en-US'].fileName.replace(/\.[^/.]+$/, ".webp");
    }
    return null;
  };

  const productions = entries
    .filter((entry) => entry.sys.contentType.sys.id === 'productions')
    .map((entry) => {
      const fields = entry.fields;
      const metadata = entry.metadata;
      const imageId = fields.image?.['en-US']?.sys.id;

      // Extract credits from the new structure
      const credits = fields.credits?.['en-US']?.map((credit) => ({
        name: credit.name,
        contribution: credit.contribution,
      })) || [];

      const tags = metadata.tags.map(tag => tag.sys.id);

      return {
        title: fields.title['en-US'],
        type: fields.type['en-US'],
        description: fields.description ? fields.description?.['en-US']?.content?.[0]?.content?.[0]?.value : '',
        release_date: fields.releaseDate ? fields.releaseDate['en-US'] : '',
        image: imageId ? resolve('/images/', findAssetPathById(imageId)) : null,
        platform: fields.platform ? fields.platform['en-US'] : '',
        youtube_url: fields.youTubeUrl ? fields.youTubeUrl['en-US'] : null,
        pouet_url: fields.pouetUrl ? fields.pouetUrl['en-US'] : null,
        demozoo_url: fields.demozooUrl ? fields.demozooUrl['en-US'] : null,
        credits: credits,
        tags: tags,
      };
    });

  return { productions };
}

// Export for module usage
export const name = 'transformProductions';
