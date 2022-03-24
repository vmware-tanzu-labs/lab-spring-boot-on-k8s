#!/bin/bash

cat >> /opt/gateway/src/backend/views/dashboard-page.pug << EOF
        script(src="/initializr/message-receiver.js")
EOF
