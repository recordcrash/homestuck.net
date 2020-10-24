# Recursively optimize PNG and JPEG images using convert command
#
# `convert` is part of ImageMagick (http://www.imagemagick.org/). You will need to install it first.
#
# Author: Rajendra Kumar Bhochalya (http://rkb.io)
#
# @see https://developers.google.com/speed/docs/insights/OptimizeImages

# Optimize all JPEG images in current directory and subdirectories
find . -name "*.jpg" -exec convert "{}" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB "{}" \; -exec echo "{}" \;

# Optimize all PNG images in current directory and subdirectories
find . -name "*.png" -exec convert "{}" -strip "{}" \; -exec echo "{}" \;