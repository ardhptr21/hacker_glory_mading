<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Dashboard\DashboardCategoryController;
use App\Http\Controllers\Dashboard\DashboardMagazineController;
use App\Http\Controllers\Dashboard\DashboardUserController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\MagazineController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

// === General Page Routes ===
Route::controller(PageController::class)->name('page.')->group(function () {
  Route::get('/', 'home')->name('home');
});

// === Auth Routes ===
Route::controller(AuthController::class)->prefix('auth')->name('auth.')->middleware('guest')->group(function () {
  Route::inertia('login', 'auth/login')->name('login');
  Route::inertia('register', 'auth/register')->name('register');
  Route::post('login', 'login');
  Route::post('register', 'register');
});

// === Category Routes ===
Route::controller(CategoryController::class)->prefix('categories')->name('category.')->group(function () {
  Route::get('/{category:slug}', 'view')->name('view');
});

// === Magazine/Mading Routes ====
Route::controller(MagazineController::class)->prefix('mading')->name('mading.')->group(function () {
  Route::get('/{magazine:slug}', 'view')->name('view');
});

// === Dashboard Routes ===
Route::prefix('dashboard')->name('dashboard.')->middleware('auth')->group(function () {
  Route::inertia('/', 'dashboard/index')->name('index');

  // === User Routes ===
  Route::controller(DashboardUserController::class)->middleware('role:admin')->prefix('users')->name('user.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::delete('/{user:username}', 'destroy')->name('destroy');
  });

  // === Mading/Magazine Dashboard Routes ===
  Route::controller(DashboardMagazineController::class)->middleware('role:admin,guru,pengurus')->prefix('mading')->name('mading.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
    Route::get('/create', 'create')->name('create');
    Route::put('/{magazine:slug}', 'update')->name('update');
    Route::get('/{magazine:slug}/edit', 'edit')->name('edit');
    Route::delete('/{magazine:slug}', 'destroy')->name('destroy');
  });

  // === Dashboard Category Routes ===
  Route::controller(DashboardCategoryController::class)->middleware('role:admin,guru,pengurus')->prefix('categories')->name('category.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
  });
});

// === Image Upload Routes ===
Route::controller(ImageUploadController::class)->middleware('auth')->prefix('upload')->name('upload.')->group(function () {
  Route::post('/', 'store')->name('store');
});
