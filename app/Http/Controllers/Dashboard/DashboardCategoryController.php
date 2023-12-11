<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Models\Category;

class DashboardCategoryController extends Controller
{
  public function index()
  {
    $categories = Category::all();
    return inertia('dashboard/category/index', compact('categories'));
  }

  public function store(StoreCategoryRequest $request)
  {
    $data = $request->validated();
    $category = Category::create($data);

    if (!$category) {
      return redirect()->back()->with('error', 'Gagal membuat kategori');
    }

    return redirect()->back()->with('success', 'Berhasil membuat kategori');
  }
}
