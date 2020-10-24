#!/bin/perl
use Mojo::DOM;
open my $fh, '<', 'formspring_Oct-9-2011.htm';
my $html = '';

while (<$fh>) {
    $html .= $_;
}
my $dom = Mojo::DOM->new($html);
$dom->find('div.q_actions')->map('remove');
$dom->find('ul.q_metadata')->map('remove');

print "$dom";
