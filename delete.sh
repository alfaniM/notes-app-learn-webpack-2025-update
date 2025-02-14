#!/bin/bash

# Konfigurasi API
API_URL="https://notes-api.dicoding.dev/v2/notes"

# Ambil semua catatan yang ada
RESPONSE=$(curl -s -X GET "$API_URL")

# Ekstrak semua ID catatan secara manual
IDS=($(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | sed 's/"id":"//g' | sed 's/"//g'))

# Loop untuk menghapus setiap catatan
for ID in "${IDS[@]}"; do
    DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/$ID")
    echo "Deleted Note ID: $ID - Response: $DELETE_RESPONSE"
done
