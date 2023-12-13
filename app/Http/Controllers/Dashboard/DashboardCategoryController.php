<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
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
    $data['author_id'] = auth()->id();
    $category = Category::create($data);

    if (!$category) {
      return redirect()->back()->with('error', 'Gagal membuat kategori');
    }

    return redirect()->back()->with('success', 'Berhasil membuat kategori');
  }

  public function update(UpdateCategoryRequest $request, Category $category)
  {
    $data = $request->validated();
    $category->update($data);

    if (!$category) {
      return redirect()->back()->with('error', 'Gagal mengubah kategori');
    }

    return redirect()->back()->with('success', 'Berhasil mengubah kategori');
  }

  public function destroy(Category $category)
  {
    $category->delete();

    if (!$category) {
      return redirect()->back()->with('error', 'Gagal menghapus kategori');
    }

    return redirect()->back()->with('success', 'Berhasil menghapus kategori');
  }
}
