#!/bin/bash

# Konfigurasi API
API_URL="https://notes-api.dicoding.dev/v2/notes"  # URL API Dicoding Notes

# Data catatan dalam array
NOTES=(
    '{"title": "Ubur-ubur ikan lele", "body": "Ngoding bareng ayang ler."}'
    '{"title": "Kenapa ayam nyebrang jalan?", "body": "Karena dia mau ke seberang."}'
    '{"title": "Beli HP baru", "body": "Tapi pulsanya lupa beli."}'
    '{"title": "Orang kaya naik helikopter", "body": "Orang miskin naik harapan."}'
    '{"title": "Kenapa kucing suka ngintip?", "body": "Karena penasaran 9 kali lebih banyak dari manusia."}'
    '{"title": "Programmer ke warteg", "body": "Mbak, nasi 1, tapi loop sampai kenyang!"}'
    '{"title": "Kenapa laptop sering hang?", "body": "Karena suka panas-panasan."}'
    '{"title": "Kenapa kopi hitam?", "body": "Karena kalau putih namanya susu."}'
    '{"title": "Kenapa programmer jarang pacaran?", "body": "Karena takut ada bug di hubungan."}'
    '{"title": "Kenapa ban motor bundar?", "body": "Coba aja kotak, pasti nggak jalan."}'
)

# Menambahkan hingga 100 jokes
for i in {11..12}; do
    NOTES+=("{\"title\": \"Joke ke-$i\", \"body\": \"Ini adalah joke ke-$i, tapi kamu tetap nggak ketawa.\"}")
done

# Loop untuk mengirim setiap catatan
for NOTE in "${NOTES[@]}"; do
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$NOTE")
    
    echo "Response: $RESPONSE"
done