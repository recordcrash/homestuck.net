#!/bin/perl
# Usage (who cares?) `./extract.pl <date> <file>` in same directory as tumblr.html
my $html = '';
my $date = shift @ARGV;

while (<>) {
    $html .= $_;
}
$html =~ s/.*<div id="content">//s;
$html =~ s/<div class="notecontainer">.*//s;
if ($html =~ s@<a href="/web/[0-9]+/http://mspandrew.tumblr.com/post/[^ ]*/([^ ]*)">@<a href="#$1">@) {
    my $anchor = $1;
    $html =~ s/<div class="post">/<div class="post" id="$anchor">/;
}
$html =~ s/\n//g;
$html =~ s/\r//g;
$html =~ s@<div class="notes">[0-9,]+ notes </div>@@;
$html =~ s@<div class="date"> *Posted.*ago@<div class="date">Posted on $date@;
$html =~ s@href="/web/[0-9]+/@href="@g;
$html =~ s@<em>([^ ]*) asked:</em>@<em><a id="$1" href="#$1">$1 asked:</a></em>@g;
$html .= '</div><div class="bottom"></div>';

open my $fh, '<', './tumblr.html';
my $tumblr = '';
while (<$fh>) {
    s/<!-- ADD HERE -->/<!-- ADD HERE -->\n$html/;
    $tumblr .= $_;
}
close $fh;
open $fh, '>', './tumblr.html';
print $fh $tumblr;
#print $html;