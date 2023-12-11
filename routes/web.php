<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Dashboard\DashboardCategoryController;
use App\Http\Controllers\Dashboard\DashboardMagazineController;
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
  Route::controller(DashboardMagazineController::class)->middleware('role:admin,guru,pengurus')->prefix('mading')->name('mading.')->group(function () {
    Route::post('/', 'store')->name('store');
    Route::get('/create', 'create')->name('create');
  });

  // === Dashboard Category Routes ===
  Route::controller(DashboardCategoryController::class)->middleware('role:admin,guru,pengurus')->prefix('categories')->name('category.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
  });
});
