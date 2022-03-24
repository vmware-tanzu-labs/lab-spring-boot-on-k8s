#!/bin/bash

set -x

# The MAVEN_CACHE_IMAGE environment variable is set from the Workshop
# definition so the location can be overridden. This allows the image to
# be copied into an image registry in the same cluster as Educates is
# running, speeding up the download.

time imgpkg pull -i $MAVEN_CACHE_IMAGE -o $HOME/.m2
