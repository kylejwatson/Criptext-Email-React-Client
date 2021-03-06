cmake_minimum_required(VERSION 3.5.1)

set(CMAKE_CXX_FLAGS "-std=c++17")

include_directories(
    /usr/local/include 
    /usr/include)

set(SOURCES
    main.cpp
    src/http/http.cpp
    src/http/handlers/helpers.cpp
    src/http/handlers/cors.cpp
    src/http/handlers/keyBundle.cpp
    src/http/handlers/encrypt.cpp
    src/http/handlers/decrypt.cpp
    src/crypto/crypto.c
    src/crypto/signal.cpp
    src/crypto/store.cpp
    src/crypto/base64.c
    src/crypto/protocol_store/IdentityKeyStore.cpp
    src/crypto/protocol_store/PreKeyStore.cpp
    src/crypto/protocol_store/SessionStore.cpp
    src/crypto/protocol_store/SignedPreKeyStore.cpp
    src/crypto/protocol_store/decode_utils.cpp
    ../../db_interface/src/axolotl/Account.cpp
    ../../db_interface/src/axolotl/IdentityKey.cpp
    ../../db_interface/src/axolotl/PreKey.cpp
    ../../db_interface/src/axolotl/SessionRecord.cpp
    ../../db_interface/src/axolotl/SignedPreKey.cpp)

find_package(OpenSSL REQUIRED)

add_executable(alice ${SOURCES})

set_target_properties(alice PROPERTIES 
    OUTPUT_NAME "criptext-encryption-service"
    RUNTIME_OUTPUT_DIRECTORY "./Release"
)

target_link_libraries(alice OpenSSL::SSL)
target_link_libraries(alice pthread)
target_link_libraries(alice dl)
target_link_libraries(alice sqlite3)
target_link_libraries(alice signal-protocol-c m)
target_link_libraries(alice civetweb)
target_link_libraries(alice cjson)
target_link_libraries(alice spdlog)