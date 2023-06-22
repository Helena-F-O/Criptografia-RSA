#include "TextChunk.hpp"

#include <string>
#include <vector>
#include <sstream>
#include <gmpxx.h>

TextChunk::TextChunk(mpz_class n)
{
    mpz_class big256 = 256;
    mpz_class big0 = 0;

    if (cmp(n, big0) == 0) {
        stringVal = "0";
    } else {
        stringVal = "";

        while (cmp(n, big0) > 0) {
            mpz_class quot, rem;
            quot = n / 256;
            rem = n % 256;

            int charNum = rem.get_si();

            stringVal += (char) charNum;
            n = quot;
        }
    }
}

mpz_class TextChunk::bigIntValue()
{
    mpz_class big256 = 256;
    mpz_class result = 0;

    // in this encoding, first characters of stringVal are the
    // least significant part of the result
    for (int i = stringVal.length()-1; i >= 0; i--) {
        mpz_class temp = (int) stringVal.at(i);
        result *= big256;
        result += temp;
    }
    return result;
}
   
int TextChunk::blockSize(mpz_class n)
{
    // value computed is log_2(N-1)
    mpz_class big1 = 1;
    mpz_class big2 = 2;

    int blockSize = 0;  // result
    mpz_class temp = n - big1;

    while (cmp(temp, big1) > 0) {
        temp = temp / big2;
        blockSize++;
    }
    
    return blockSize/8;
}

std::vector<std::string> TextChunk::splitChunks(const std::string& str, int n)
{
    std::vector<std::string> substrings;
 
    for (size_t i = 0; i < str.size(); i += n) {
        substrings.push_back(str.substr(i, n));
    }
 
    return substrings;
}

std::vector<std::string> TextChunk::splitChunks(const std::string& str, char c)
{
    std::vector<std::string> chunks;
    std::string chunk;
    std::stringstream strstream(str);

    while(std::getline(strstream, chunk, c)) {
        chunks.push_back(chunk);
    }

    return chunks;
}