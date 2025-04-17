import path from 'path';

/**
 * Transforms Contentful JSON export to the target simplified format.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 * @returns {Object} The transformed JSON.
 */
export function transformMusic(contentfulData) {
  const { entries, assets } = contentfulData;

  // Helper to find asset by ID and resolve the local path
  const findAssetPathById = (assetId) => {
    const asset = assets.find((a) => a.sys.id === assetId);
    if (asset && asset.fields.file && asset.fields.file['en-US']) {
      return asset.fields.file['en-US'].fileName.replace(/\.[^/.]+$/, ".webp");
    }
    return null;
  };

  const music = entries
    .filter((entry) => entry.sys.contentType.sys.id === 'music')
    .map((entry) => {
      const fields = entry.fields;
      const metadata = entry.metadata;
      
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
        // release_date: fields.releaseDate ? fields.releaseDate['en-US'] : '',
        platform: fields.platform ? fields.platform['en-US'] : '',
        download_url: fields.download ? fields.download['en-US'] : null,
        demozoo_url: fields.demozooUrl ? fields.demozooUrl['en-US'] : null,
        credits: credits,
      };
    });

  return { music };
}

// Export for module usage
export const name = 'transformMembers'
