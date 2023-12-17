<?php

namespace App\Exports;

use App\Models\Magazine;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AnalyticsGeneralSheet implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize
{

  protected int $total_views;

  public function __construct(int $total_views)
  {
    $this->total_views = $total_views;
  }

  /**
   * @return \Illuminate\Support\Collection
   */
  public function collection()
  {
    $total_magazines = Magazine::where('author_id', auth()->id())->count();
    $total_pending_magazines = Magazine::where('author_id', auth()->id())->where('approved', 0)->count();

    $data = [strval($total_magazines), strval($total_pending_magazines), strval($this->total_views)];

    if (auth()->user()->role === 'admin') {
      $data[] = strval(User::count());
    }

    return collect([$data]);
  }

  public function headings(): array
  {
    $named = [
      'Total Mading',
      'Total Mading Pending',
      'Total Pengunjung'
    ];

    if (auth()->user()->role === 'admin') {
      $named[] = 'Total Users';
    }

    return $named;
  }

  public function title(): string
  {
    return 'Data Umum';
  }
}
