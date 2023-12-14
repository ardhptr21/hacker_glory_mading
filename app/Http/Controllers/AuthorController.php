<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
  public function view(Request $request, User $author)
  {
    $q = $request->query('q');
    $sort = $request->query('sort', 'desc');
    $category = $request->query('category');

    $magazines = $author->magazines()
      ->with('category:id,name,slug')
      ->published()
      ->when($category, fn ($query) => $query->where('category_id', $category))
      ->filter($q, $sort)
      ->get();

    return inertia('author/view', compact('author', 'magazines'));
  }
}
