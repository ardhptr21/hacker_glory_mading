<?php

namespace App\Http\Controllers;

use App\Http\Requests\Magazine\StoreMagazineRequest;
use App\Models\Magazine;
use App\Traits\UploadFile;

class MagazineController extends Controller
{
  use UploadFile;

  public function store(StoreMagazineRequest $request)
  {
    $data = $request->validated();
    $data['thumbnail'] = $this->upload($data['thumbnail'], 'thumbnail', 'magazines');
    $magazine = Magazine::create($data);

    if (!$magazine) {
      return back()->with('error', 'Gagal menambahkan mading, coba lagi.');
    }

    return back()->with('success', 'Berhasil menambahkan mading.');
  }
}
