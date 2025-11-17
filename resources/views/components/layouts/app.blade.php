<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <meta name="description" content="{{ $description ?? '' }}">
    <meta name="keywords" content="{{ $keywords ?? '' }}">
    <meta name="author" content="{{ $author ?? '' }}">
    <link rel="shortcut icon" href="{{ asset('assets/img/') }}" type="image/x-icon">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/8b186f73b9.js" crossorigin="anonymous"></script>

    @livewireStyles
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    {{ $slot }}
    @livewireScripts
    <livewire:w4laravelkit.ui.toast-component />
    <livewire:w4laravelkit.ui.session-flash-component />
    @persist('wem')
        {{-- Livewire v3: persiste entre wire:navigate --}}
        <div wire:ignore id="wem-root">
            <livewire:wire-elements-modal :key="'wem-global'" />
        </div>
    @endpersist
</body>

</html>