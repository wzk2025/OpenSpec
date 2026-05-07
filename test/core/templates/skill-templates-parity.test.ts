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
  getExploreSkillTemplate: '9a9e4874d911e781d541ca853063f04082f2165af6ac3f1825cded332b2060d4',
  getNewChangeSkillTemplate: '2c4041ab3d7f6eb6ba22ed9d7da420b89ac40d2e194791209ab5fce4eb96da49',
  getContinueChangeSkillTemplate: 'dfc0964bda6a0607c880fed27ccc8f80a6fff91bd1e15534a5077a6b26468e3a',
  getApplyChangeSkillTemplate: '63b2aa63f83e5f03310f838fce6a702da9cf79fcfa36a23d28112763101f4558',
  getFfChangeSkillTemplate: '74bf1630c2bf660ac58567ae0bad63bb17edf9e04e0041dbb3a394ae253ea379',
  getSyncSpecsSkillTemplate: 'a9a37ac46fddd9ded859f83a02adc45a1a6c127f018c34829cdff6d64ff9107b',
  getOnboardSkillTemplate: '3e4ac2f08210a2de6f286941aaa6be936f3cd78c89293010ba29c6e3dc86dc12',
  getOpsxExploreCommandTemplate: '4485c71edc3f756269b4b6b9ed61c325aba630fe2806efbc33a119f133090e11',
  getOpsxNewCommandTemplate: '4875fca410d0ace0e792baa8b8a73cd4ba08ad5030a0ed91e60e39aeca525592',
  getOpsxContinueCommandTemplate: 'e9d8e3e14d0d273d6b9fa5009a0b7912e1fd46949dc20f95ee7d9b53d8475688',
  getOpsxApplyCommandTemplate: 'fbade555f22da813f88ca410a4365fe72dfb4de8ee1dff648fdbbd553a1a27ca',
  getOpsxFfCommandTemplate: '94912e1a21860369d26e5fe170c4b135fa8cc5d72c376ba5cca2a0c6c48e173a',
  getArchiveChangeSkillTemplate: '8431c76550f231c108e168badbb6eebdf360f75d621921bf91528c45556e3906',
  getBulkArchiveChangeSkillTemplate: 'b86c07cb02cd473a15bfe8d35564089f2b319f765976bdb124b35c78b74ce949',
  getOpsxSyncCommandTemplate: 'be70b0fb55ca1ecd64d5879751819cd438811b3327f049aa777957bc42136dfb',
  getVerifyChangeSkillTemplate: 'a4dfd7887335d0c7f2ccaf08f899969bb3d2f9ef1eba13bb3cf9f6a9e746587e',
  getOpsxArchiveCommandTemplate: 'ea62adc95f07e39d1a36bab33ea2837409ba072cc804c41c45b3dbbad5f94e4e',
  getOpsxOnboardCommandTemplate: '6d8d4dafdc9cf743e662faf5c86a0598d69a170beab8d10cbf7696d3d883b629',
  getOpsxBulkArchiveCommandTemplate: '8d03875a38ef08641ce11183f0c0e26103ce948234378ecbc9083fd77d9e423a',
  getOpsxVerifyCommandTemplate: '04da25ef44d3f63ef3d77edd69cf3e8536a0cc2b8af08070c347e50ef1c67f4d',
  getOpsxProposeSkillTemplate: '4fd718e0d4c2640cd945dc43e2af7fea8e9ebdf10a67ac5cf12fd0c75e01ff6a',
  getOpsxProposeCommandTemplate: 'bc5a37ba2c0575922d34e3e3609304092ecaa7400766aa96139e69bf69215010',
  getFeedbackSkillTemplate: 'ffa8fcf63a98586d130635f126ccf77e3df007553165694e30d00398e9cd4e80',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'openspec-explore': '4073529f33e2a14d5d3ad75b148bb22699c75ae143a21425040255724874a461',
  'openspec-new-change': 'bbbb18091f51b0ad68d0f4cb62fb0c42612595dc5e0e7355732c11acf96e6dc6',
  'openspec-continue-change': '5fa669bd34754245a8f5daefe334d9971c01f4cf0bd04705dc5b58653f96715d',
  'openspec-apply-change': '0d19b77ad332318dcf310b0c2dc142df10cd7e774260ba6159c92fd5957a5209',
  'openspec-ff-change': '04af47e022d1a41a6f8cccdddaed150616dc4203cd749ea3c163ce0b8891c6f2',
  'openspec-sync-specs': '5c25832e080fbbea1ea246fb072d087ad50f7be3aa744b59d26b0878acc6e8ae',
  'openspec-archive-change': 'da989dc7b657f9b1413bc39d73dd3b934f41659cde0e546efe8bedca823302cf',
  'openspec-bulk-archive-change': '3addc2c5d1a977a315be6d3f209a62370f50416acb1003bc17b6ba9cac1a3e1f',
  'openspec-verify-change': 'ba22d96a6b9e43883b70b1b40863ce0ed3dec65ed23324ad3585ce2aaf54addb',
  'openspec-onboard': 'd38a591eb8b030733c0378cafd89222fe9be557c94e1436da0119b215a222d12',
  'openspec-propose': '8df10d4d4b628209607eb3517c4d867f022d43c62102684a526cd2a9c38e6ea0',
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
      ['openspec-explore', getExploreSkillTemplate],
      ['openspec-new-change', getNewChangeSkillTemplate],
      ['openspec-continue-change', getContinueChangeSkillTemplate],
      ['openspec-apply-change', getApplyChangeSkillTemplate],
      ['openspec-ff-change', getFfChangeSkillTemplate],
      ['openspec-sync-specs', getSyncSpecsSkillTemplate],
      ['openspec-archive-change', getArchiveChangeSkillTemplate],
      ['openspec-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['openspec-verify-change', getVerifyChangeSkillTemplate],
      ['openspec-onboard', getOnboardSkillTemplate],
      ['openspec-propose', getOpsxProposeSkillTemplate],
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
