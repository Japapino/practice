import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public boolean isAnagram(String s, String t) {
        char[] testWord = s.toCharArray();
        // make stack of test word letters
        List<Character> sampleWord = new ArrayList<Character>();
        for (Character c : s.toCharArray()) {
            sampleWord.add(c);
        }

        // check test word agaisnt array of letters
        for (int j = 0; j < t.length(); j++) {
            // remove letter from array if present, return false if not in array
            Character letter = testWord[j];
            System.out.println("letter: " + letter);

            if (sampleWord.contains(letter)) {
                sampleWord.remove(letter);
            } else {
                return false;
            }
        }


        return true && sampleWord.isEmpty();
    }
}