<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Magazine\StoreMagazineRequest;
use App\Http\Requests\Magazine\UpdateMagazineRequest;
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

  public function edit(Magazine $magazine)
  {
    $categories = Category::all();
    return inertia('dashboard/mading/edit', compact('magazine', 'categories'));
  }

  public function update(UpdateMagazineRequest $request, Magazine $magazine)
  {
    $data = $request->validated();
    if ($request->hasFile('thumbnail')) {
      $data['thumbnail'] = $this->upload($data['thumbnail'], 'thumbnail', 'magazines', $magazine->thumbnail);
    } else {
      unset($data['thumbnail']);
    }

    $updated = $magazine->update($data);

    if (!$updated) {
      return back()->with('error', 'Gagal mengubah mading, coba lagi.');
    }

    return to_route('dashboard.mading.edit', $magazine->slug)->with('success', 'Berhasil mengubah mading.');
  }

  public function destroy(Magazine $magazine)
  {
    $deleted = $magazine->delete();

    if (!$deleted) {
      return back()->with('error', 'Gagal menghapus mading, coba lagi.');
    }

    $this->delete($magazine->thumbnail);

    return to_route('dashboard.mading.index')->with('success', 'Berhasil menghapus mading.');
  }
}
