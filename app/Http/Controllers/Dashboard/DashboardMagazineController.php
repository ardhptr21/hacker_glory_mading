<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Magazine\StoreMagazineRequest;
use App\Models\Category;
use App\Models\Magazine;
use App\Traits\UploadFile;

class DashboardMagazineController extends Controller
{
  use UploadFile;

  public function index()
  {
    $magazines = Magazine::with(['category:id,name', 'author:id,username'])->latest()->get();
    return inertia('dashboard/mading/index', compact('magazines'));
  }

  public function create()
  {
    $categories = Category::all();
    return inertia('dashboard/mading/create', compact('categories'));
  }

  public function store(StoreMagazineRequest $request)
  {
    $data = $request->validated();
    $data['thumbnail'] = $this->upload($data['thumbnail'], 'thumbnail', 'magazines');
    $data['author_id'] = auth()->id();
    $magazine = Magazine::create($data);

    if (!$magazine) {
      return back()->with('error', 'Gagal menambahkan mading, coba lagi.');
    }

    return to_route('dashboard.mading.index')->with('success', 'Berhasil menambahkan mading.');
  }
}
