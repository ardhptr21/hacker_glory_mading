<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  public function view(Request $request, Category $category)
  {
    $q = $request->query('q');
    $sort = $request->query('sort', 'desc');

    $magazines = $category->magazines()
      ->with('author:id,username')
      ->published()
      ->filter($q, $sort)
      ->get();

    return inertia('category/view', compact('category', 'magazines'));
  }
}
