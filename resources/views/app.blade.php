<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Titan+One&display=swap"
    rel="stylesheet">
  @viteReactRefresh()
  @vite(['resources/js/app.jsx', 'resources/css/app.css'])
  @inertiaHead()
</head>

<body class="bg-gray-100 font-roboto selection:bg-yellow-50 selection:text-black">
  @routes()
  @inertia()
</body>

</html>
