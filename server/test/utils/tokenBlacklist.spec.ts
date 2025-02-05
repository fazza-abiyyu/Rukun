// server/test/utils/tokenBlacklist.spec.ts

import { addToBlacklist, isBlacklisted } from './../../utils/tokenBlacklist';

describe('Token Blacklist Utility', () => {

    describe('addToBlacklist', () => {
        it('should add token to the blacklist', () => {
            const token = 'sampleAccessToken123';
            addToBlacklist(token);  // Tambahkan token ke blacklist
            expect(isBlacklisted(token)).toBe(true);  // Pastikan token ada di blacklist
        });
    });
});
