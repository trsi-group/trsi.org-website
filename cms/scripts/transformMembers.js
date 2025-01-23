import path from 'path';

/**
 * Transforms Contentful JSON export to the target simplified format.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 * @returns {Object} The transformed JSON.
 */
export function transformMembers(contentfulData) {
  const { entries, assets } = contentfulData;

  // Helper to find asset by ID and resolve the local path
  const findAssetPathById = (assetId) => {
    const asset = assets.find((a) => a.sys.id === assetId);
    if (asset && asset.fields.file && asset.fields.file['en-US']) {
      return asset.fields.file['en-US'].fileName.replace(/\.[^/.]+$/, ".webp");
    }
    return null;
  };

  const members = entries
    .filter((entry) => entry.sys.contentType.sys.id === 'member')
    .map((entry) => {
      const fields = entry.fields;
      const imageId = fields.avatar?.['en-US']?.sys.id;

      return {
        handle: fields.handle['en-US'],
        real_name: fields.realName?.['en-US'],
        avatar: imageId ? path.resolve('/images/', findAssetPathById(imageId)) : null,
        member_since: fields.memberSince ? fields.memberSince['en-US'] : null,
        member_status: fields.memberStatus ? fields.memberStatus['en-US'] : null,
      };
    });

  return { members };
}

// Export for module usage
export const name = 'transformMembers'
