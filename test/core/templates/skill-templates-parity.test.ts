import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  type SkillTemplate,
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getContinueChangeSkillTemplate,
  getExploreSkillTemplate,
  getFeedbackSkillTemplate,
  getFfChangeSkillTemplate,
  getNewChangeSkillTemplate,
  getOnboardSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxArchiveCommandTemplate,
  getOpsxBulkArchiveCommandTemplate,
  getOpsxContinueCommandTemplate,
  getOpsxExploreCommandTemplate,
  getOpsxFfCommandTemplate,
  getOpsxNewCommandTemplate,
  getOpsxOnboardCommandTemplate,
  getOpsxSyncCommandTemplate,
  getOpsxProposeCommandTemplate,
  getOpsxProposeSkillTemplate,
  getOpsxVerifyCommandTemplate,
  getSyncSpecsSkillTemplate,
  getVerifyChangeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { generateSkillContent } from '../../../src/core/shared/skill-generation.js';

const EXPECTED_FUNCTION_HASHES: Record<string, string> = {
  getExploreSkillTemplate: '071d5c49144b58f0c07c931b01c47c2cb7ad7c746ce8b94d436ecb6329384ea5',
  getNewChangeSkillTemplate: 'c43095ef9287ddc7f1d7a1506b5f67c1b5760d888366857e9766e58978ade0e5',
  getContinueChangeSkillTemplate: '3c1d9ee5cdc54f13b6247a1b6311e7837aa1fb7f90502ff0999f3174cb5fd1dd',
  getApplyChangeSkillTemplate: '93c625e24672eda14754f4e416d0c98c48efaeb1775fd98115f22de365619fea',
  getFfChangeSkillTemplate: 'bc70f08698be7dfe4a434a94fe71a9548743fb2d0ab0b7f49c1a181029180ae2',
  getSyncSpecsSkillTemplate: 'b9e985ee700b3e73e9fb645af2f1a0f53c882e528075d7af1350edab460f1d8a',
  getOnboardSkillTemplate: '89d02f3f79660fcb68729b2ac899344c264f7b0144cd189d7d1b41851664e80b',
  getOpsxExploreCommandTemplate: '4485c71edc3f756269b4b6b9ed61c325aba630fe2806efbc33a119f133090e11',
  getOpsxNewCommandTemplate: '4875fca410d0ace0e792baa8b8a73cd4ba08ad5030a0ed91e60e39aeca525592',
  getOpsxContinueCommandTemplate: 'e9d8e3e14d0d273d6b9fa5009a0b7912e1fd46949dc20f95ee7d9b53d8475688',
  getOpsxApplyCommandTemplate: 'fbade555f22da813f88ca410a4365fe72dfb4de8ee1dff648fdbbd553a1a27ca',
  getOpsxFfCommandTemplate: '94912e1a21860369d26e5fe170c4b135fa8cc5d72c376ba5cca2a0c6c48e173a',
  getArchiveChangeSkillTemplate: '7f612c0fa5d9f3e7f1547baa12cae62c49ae93d5b1e85e51ed2155a86c266c0a',
  getBulkArchiveChangeSkillTemplate: 'a594269a2d3085a7297499d12787bfd246fe6613ce404ac356e3c7a317c77613',
  getOpsxSyncCommandTemplate: 'be70b0fb55ca1ecd64d5879751819cd438811b3327f049aa777957bc42136dfb',
  getVerifyChangeSkillTemplate: '504c4e0e5747d8a2e915757557d343d9e9018ef832a2ef2393ad22b38b57eb50',
  getOpsxArchiveCommandTemplate: 'd1878c9d9967cfb245509a3db17653d3b2e0e96bdc94a7d7bfacd39bb34516e6',
  getOpsxOnboardCommandTemplate: '6d8d4dafdc9cf743e662faf5c86a0598d69a170beab8d10cbf7696d3d883b629',
  getOpsxBulkArchiveCommandTemplate: 'ab00ad3219742a33652a511b1e8ce00764f442180fd7cb3440279712a6053207',
  getOpsxVerifyCommandTemplate: '04da25ef44d3f63ef3d77edd69cf3e8536a0cc2b8af08070c347e50ef1c67f4d',
  getOpsxProposeSkillTemplate: '016c8a756635c4fd6c24e32eebd701903409b72cc0b51232111f81685d06e2c0',
  getOpsxProposeCommandTemplate: 'bc5a37ba2c0575922d34e3e3609304092ecaa7400766aa96139e69bf69215010',
  getFeedbackSkillTemplate: 'ffa8fcf63a98586d130635f126ccf77e3df007553165694e30d00398e9cd4e80',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'rd-explore': '162edcafb74c452b6780ba0c513f0cb51764a853cd9b001473efc8adb88fca3e',
  'rd-new-change': 'da7e67ca483e55886567d8ede43b3cb3673f4c3d7a3f3eee137f25eb6f6420c7',
  'rd-continue-change': '581efd97fd98204c12f12ae1c93b4aec7e2ba85f780a0cc3511b28874bdbd96a',
  'rd-apply-change': 'f2fa2797b107257c76eb716c25217e2bf0973b2d40841dc93a885ffae53c7ef7',
  'rd-ff-change': '53e1353bbadf944d33892a899ca557e0601f35b82793190263526a6046033595',
  'rd-sync-specs': '7ec510ba1fd90d9b66ed109efd9cd115c1132257e95e483b693a2f7ba73de97c',
  'rd-archive-change': '96e76278b5e1cd6ef9d684fd0e2799897939c2ad5e9b1381e8ad4ce513d2755d',
  'rd-bulk-archive-change': 'a3fb025506d4689c283f113c57b4d00ee316e402df3f8d64e0d349b5b4c53141',
  'rd-verify-change': '09caa4eb361482eaaf58f31f235a1dbd92149a64d6c6323971174b1a34b24d6e',
  'rd-onboard': 'cea653f028929946d08b9ade32cd3ec354da0190ddb85d8a28bac875f812fffa',
  'rd-propose': 'bb380b97c364ae1c4c00724f7f8f547f023b13f5e03126f34be07ee7978de8f8',
};

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`);

    return `{${entries.join(',')}}`;
  }

  return JSON.stringify(value);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

describe('skill templates split parity', () => {
  it('preserves all template function payloads exactly', () => {
    const functionFactories: Record<string, () => unknown> = {
      getExploreSkillTemplate,
      getNewChangeSkillTemplate,
      getContinueChangeSkillTemplate,
      getApplyChangeSkillTemplate,
      getFfChangeSkillTemplate,
      getSyncSpecsSkillTemplate,
      getOnboardSkillTemplate,
      getOpsxExploreCommandTemplate,
      getOpsxNewCommandTemplate,
      getOpsxContinueCommandTemplate,
      getOpsxApplyCommandTemplate,
      getOpsxFfCommandTemplate,
      getArchiveChangeSkillTemplate,
      getBulkArchiveChangeSkillTemplate,
      getOpsxSyncCommandTemplate,
      getVerifyChangeSkillTemplate,
      getOpsxArchiveCommandTemplate,
      getOpsxOnboardCommandTemplate,
      getOpsxBulkArchiveCommandTemplate,
      getOpsxVerifyCommandTemplate,
      getOpsxProposeSkillTemplate,
      getOpsxProposeCommandTemplate,
      getFeedbackSkillTemplate,
    };

    const actualHashes = Object.fromEntries(
      Object.entries(functionFactories).map(([name, fn]) => [name, hash(stableStringify(fn()))])
    );

    expect(actualHashes).toEqual(EXPECTED_FUNCTION_HASHES);
  });

  it('preserves generated skill file content exactly', () => {
    // Intentionally excludes getFeedbackSkillTemplate: skillFactories only models templates
    // deployed via generateSkillContent, while feedback is covered in function payload parity.
    const skillFactories: Array<[string, () => SkillTemplate]> = [
      ['rd-explore', getExploreSkillTemplate],
      ['rd-new-change', getNewChangeSkillTemplate],
      ['rd-continue-change', getContinueChangeSkillTemplate],
      ['rd-apply-change', getApplyChangeSkillTemplate],
      ['rd-ff-change', getFfChangeSkillTemplate],
      ['rd-sync-specs', getSyncSpecsSkillTemplate],
      ['rd-archive-change', getArchiveChangeSkillTemplate],
      ['rd-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['rd-verify-change', getVerifyChangeSkillTemplate],
      ['rd-onboard', getOnboardSkillTemplate],
      ['rd-propose', getOpsxProposeSkillTemplate],
    ];

    const actualHashes = Object.fromEntries(
      skillFactories.map(([dirName, createTemplate]) => [
        dirName,
        hash(generateSkillContent(createTemplate(), 'PARITY-BASELINE')),
      ])
    );

    expect(actualHashes).toEqual(EXPECTED_GENERATED_SKILL_CONTENT_HASHES);
  });
});
