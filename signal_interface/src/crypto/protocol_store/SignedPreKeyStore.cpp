#include "SignedPreKeyStore.h"
#include "../store.h"
#include "../uthash.h"
#include <string>
#include <vector>
#include <iostream>

int signed_pre_key_store_load_signed_pre_key(signal_buffer **record, uint32_t signed_pre_key_id, void *user_data)
{
    
    CriptextDB::Account *account = (CriptextDB::Account*)user_data;
    CriptextDB::SignedPreKey signedPreKey;
    try {
        signedPreKey = CriptextDB::getSignedPreKey(account->getDB(), account->id, signed_pre_key_id);
    } catch (exception& e){
        std::cout << "ERROR SPK : " << e.what() << std::endl;
        return -1;
    }
    size_t len = 0;
    const unsigned char *recordBase64 = reinterpret_cast<const unsigned char *>(signedPreKey.record.c_str());
    uint8_t *myRecord = reinterpret_cast<uint8_t *>(base64_decode(recordBase64, signedPreKey.len, &len));    
    signal_buffer *buffer = signal_buffer_create(myRecord, len);

    *record = buffer;

    return 1;
}

int signed_pre_key_store_store_signed_pre_key(uint32_t signed_pre_key_id, uint8_t *record, size_t record_len, void *user_data)
{
    CriptextDB::Account *account = (CriptextDB::Account*)user_data;

    size_t len = 0;
    const unsigned char *myRecord = reinterpret_cast<const unsigned char *>(record);
    char *recordBase64 = reinterpret_cast<char *>(base64_encode(myRecord, record_len, &len));

    bool success = CriptextDB::createSignedPreKey(account->getDB(), account->id, signed_pre_key_id, recordBase64, len);
    return success ? 1 : 0;
}

int signed_pre_key_store_contains_signed_pre_key(uint32_t signed_pre_key_id, void *user_data)
{
    CriptextDB::Account *account = (CriptextDB::Account*)user_data;

    try {
        CriptextDB::getSignedPreKey(account->getDB(), account->id, signed_pre_key_id);
    } catch (exception& e){
        return -1;
    }
    return 1;
}

int signed_pre_key_store_remove_signed_pre_key(uint32_t signed_pre_key_id, void *user_data)
{
    CriptextDB::Account *account = (CriptextDB::Account*)user_data;

    bool success = CriptextDB::deleteSignedPreKey(account->getDB(), account->id, signed_pre_key_id);
    return success ? 1 : 0;
}

void signed_pre_key_store_destroy(void *user_data)
{
    
}

void setup_signed_pre_key_store(signal_protocol_store_context *context, CriptextDB::Account *account)
{
    signal_protocol_signed_pre_key_store store = {
            .load_signed_pre_key = signed_pre_key_store_load_signed_pre_key,
            .store_signed_pre_key = signed_pre_key_store_store_signed_pre_key,
            .contains_signed_pre_key = signed_pre_key_store_contains_signed_pre_key,
            .remove_signed_pre_key = signed_pre_key_store_remove_signed_pre_key,
            .destroy_func = signed_pre_key_store_destroy,
            .user_data = account
    };

    signal_protocol_store_context_set_signed_pre_key_store(context, &store);
}