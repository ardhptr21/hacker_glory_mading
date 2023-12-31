<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Magazine\StoreMagazineRequest;
use App\Http\Requests\Magazine\UpdateMagazineRequest;
use App\Models\Category;
use App\Models\Magazine;
use App\Repositories\MagazineRepository;
use App\Traits\UploadFile;
use Illuminate\Http\Request;

class DashboardMagazineController extends Controller
{
  use UploadFile;

  public function index(Request $request, MagazineRepository $magazineRepository)
  {
    $q = $request->query('q');
    $sort = $request->query('sort') ?? 'desc';
    $published = $request->query('published');
    $approved = $request->query('approved');
    $important = $request->query('important');

    $magazines = [];
    if ($request->user()->role === 'admin') {
      $magazines = $magazineRepository->getAll(20, $q, $published, $approved, $important, $sort);
    } else {
      $magazines = $magazineRepository->getAllByAuthor(20, auth()->id(), $q, $published, $approved, $important, $sort);
    }

    return inertia('dashboard/mading/index', compact('magazines'));
  }

  public function requestMading(Request $request)
  {
    $q = $request->query('q');
    $sort = $request->query('sort') ?? 'desc';

    $magazines = Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->notApproved()
      ->filter($q, $sort)
      ->paginate(20)
      ->withQueryString();

    return inertia('dashboard/mading/request', compact('magazines'));
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
    if ($magazine->author_id !== auth()->id() and auth()->user()->role !== 'admin') {
      abort(403);
    }

    $categories = Category::all();
    $magazine->load('category:id,name,slug');
    return inertia('dashboard/mading/edit', compact('magazine', 'categories'));
  }

  public function update(UpdateMagazineRequest $request, Magazine $magazine)
  {
    if ($magazine->author_id !== auth()->id() and auth()->user()->role !== 'admin') {
      abort(403);
    }

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
    if ($magazine->author_id !== auth()->id() and auth()->user()->role !== 'admin') {
      abort(403);
    }

    $deleted = $magazine->delete();

    if (!$deleted) {
      return back()->with('error', 'Gagal menghapus mading, coba lagi.');
    }

    $this->delete($magazine->thumbnail);

    return to_route('dashboard.mading.index')->with('success', 'Berhasil menghapus mading.');
  }

  public function approve(Magazine $magazine)
  {
    $approved = $magazine->update([
      'approved' => true,
    ]);

    if (!$approved) {
      return back()->with('error', 'Gagal mengubah status mading, coba lagi.');
    }

    return back()->with('success', 'Berhasil mengubah status mading.');
  }
}
