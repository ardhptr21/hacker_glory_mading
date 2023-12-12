<?php

namespace App\Http\Controllers;

use App\Traits\UploadFile;
use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
  use UploadFile;

  public function store(Request $request)
  {
    $validated = $request->validate([
      'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $path = $this->upload($validated['image'], 'image', 'articles');

    return response()->json(['path' => $path]);
  }
}
