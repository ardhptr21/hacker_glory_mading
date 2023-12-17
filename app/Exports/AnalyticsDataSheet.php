<?php

namespace App\Exports;

use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class AnalyticsDataSheet implements FromCollection, WithTitle, WithHeadings, WithMapping, ShouldAutoSize
{
  protected $data;
  protected $range = '7d';
  public function __construct($data, $range)
  {
    if ($data) {
      $this->data = $data;
    }
  }

  public function title(): string
  {
    switch ($this->range) {
      case 'today':
        return 'Hari ini';
      case 'yesterday':
        return 'Kemarin';
      case '7d':
        return '7 Hari Terakhir';
      case '14d':
        return '14 Hari Terakhir';
      case '1m':
        return '1 Bulan Terakhir';
      case '3m':
        return '3 Bulan Terakhir';
      case '6m':
        return '6 Bulan Terakhir';
      case '1y':
        return '1 Tahun Terakhir';
      default:
        return '7 Hari Terakhir';
    }
  }

  public function headings(): array
  {
    return [
      'Tanggal',
      'Pengunjung'
    ];
  }

  public function collection()
  {
    return $this->data;
  }

  public function map($item): array
  {
    return [
      Carbon::parse($item->date)->format('d F Y'),
      $item->views
    ];
  }
}
