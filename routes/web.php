<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MagazineController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home');

// === Auth Routes ===
Route::controller(AuthController::class)->prefix('auth')->name('auth.')->middleware('guest')->group(function () {
  Route::inertia('login', 'auth/login')->name('login');
  Route::inertia('register', 'auth/register')->name('register');
  Route::post('login', 'login');
  Route::post('register', 'register');
});

// === Category Routes ===
Route::prefix('categories')->name('category.')->group(function () {
  Route::inertia('/{id}', 'category/view')->name('view');
});

// === Magazine Article View ====
Route::prefix('mading')->name('mading.')->group(function () {
  Route::inertia('/{id}', 'mading/view')->name('view');
});

// === Dashboard Routes ===
Route::prefix('dashboard')->name('dashboard.')->middleware('auth')->group(function () {
  Route::inertia('/', 'dashboard/index')->name('index');

  // === Mading/Magazine Dashboard Routes ===
  Route::prefix('mading')->name('mading.')->group(function () {
    Route::inertia('/create', 'dashboard/mading/create')->name('create')->middleware('role:admin,guru,pengurus');
  });
});


// === Mading/Magazine Routes ===
Route::controller(MagazineController::class)->prefix('mading')->name('mading.')->group(function () {
  Route::post('/', 'store')->name('store')->middleware('role:admin,guru,pengurus');
});
