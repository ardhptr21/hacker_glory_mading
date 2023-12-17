<?php

namespace App\Http\Controllers;

use App\Http\Requests\Bookmark\StoreBookmarkRequest;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
  public function index(Request $request)
  {
    $q = $request->query('q');
    $sort = $request->query('sort', 'desc');

    $bookmarks = $request->user()->bookmarks()->with('magazine.category:id,name,slug', 'magazine.author:id,username')->whereHas('magazine', function ($query) use ($q) {
      $query->filter($q);
    })->when($sort, function ($query, $sort) {
      $query->orderBy('created_at', $sort);
    })->paginate(10);

    return inertia('bookmark/index', compact('bookmarks'));
  }

  public function store(StoreBookmarkRequest $request)
  {
    if ($request->user()->bookmarks()->where('magazine_id', $request->magazine_id)->exists()) {
      return back()->with('success', 'Bookmark sudah ada.');
    }

    $request->user()->bookmarks()->create(['magazine_id' => $request->magazine_id]);

    return back()->with('success', 'Berhasil menambahkan bookmark.');
  }

  public function destroy(Bookmark $bookmark)
  {
    if ($bookmark->user_id !== auth()->id()) {
      abort(403);
    }

    $deleted = $bookmark->delete();

    if ($deleted) {
      return back()->with('success', 'Berhasil menghapus bookmark.');
    }
  }
}
