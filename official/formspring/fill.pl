#!/bin/perl

open my $fh, '<', 'Combined_Formspring_Web_Aug-28-2011.htm';
my $html = '';

while (<$fh>) {
    $html .= $_;
}

$html =~ s|<p class="question" id="andrewhussie([0-9]+)"><a href="http://dl.dropbox.com/u/40585720/Combined_Formspring_Web_Aug-28-2011.htm#andrewhussie[0-9]+">(.*?)</a></p>\n *<p class="answer">(.*?)</p>|<li class="question profile-stream " id="$1">
    <div class="fleft">
        <a _title="Andrew Hussie" class="avatar hovercard answerer" href="#" title=""><img alt="Andrew Hussie" height="55" src="files/andrewhussie_medium.gif" width="55"></a>
    </div>
    <div class="question-container">
        <h2 class="" rel="question">
            <a href="#$1">
                $2
            </a>
        </h2>
        <div class="cright"></div>
    </div>

    <div class="response-container">
        <p rel="response-text">
            $3
        </p>
    </div>

    <div class="meta">
        <div>
            <span class="accountReference">
                <a _title="" class="accountLink hovercard" href="#" title="">mspadventures</a>
                responded
            </span>
            <a class="nowrap" href="#$1">
                At some point
            </a>
        </div>
    </div>
</li>|sg;

print $html;
