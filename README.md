# Hacker Glory Mading

By: Ardhi Putra Pradana - SMKN 7 Semarang

Untuk menjalankan proyek ini dapat melakukan langkah - langkah berikut:

1. Copy file .env.example menjadi .env

```sh
$ cp .env.example .env
```

> pada config database dapat disesuaikan dengan konfigurasi masing - masing

2. Melakukan generate key

```sh
$ php artisan key:generate
```

3. Menginstall dependency

```sh
$ composer install
```

```sh
# yarn
$ yarn dev

# npm
$ npm install
```

4. Build assets

```sh
# yarn
$ yarn build

# npm
$ npm build
```

5. Melakukan migrate

```sh
$ php artisan migrate --seed
```

6. Menjalankan

```sh
$ php artisan serve
```
