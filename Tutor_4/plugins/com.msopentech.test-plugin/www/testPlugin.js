/**
 * Copyright (c) Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License
*/

var badge = document.createElement('div');
badge.className = "test-plugin-badge";

var badgeText = document.createElement('span');
badgeText.innerText = "Plugin com.msopentech.test-plugin has been installed";

var badgeButton = document.createElement('button');
badgeButton.className = "test-plugin-dismiss-button";
badgeButton.innerText = "Close";

badgeButton.addEventListener('click', function () {
    document.body.removeChild(badge);
});

badge.appendChild(badgeText);
badge.appendChild(badgeButton);

var badgeStyle = document.createElement('link');
badgeStyle.type = 'text/css';
badgeStyle.rel = 'stylesheet';
badgeStyle.href = 'testPlugin.css';

document.head.appendChild(badgeStyle);

var firstElem = document.body.firstChild;
document.body.insertBefore(badge, firstElem);
