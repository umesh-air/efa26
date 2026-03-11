        // Event data
        const events = {
            '2025-01-15': {
                title: 'European Forum Alpbach 2026 Info Session',
                location: 'Innsbruck, Austria',
                description: 'Learn about opportunities for young entrepreneurs at EFA 2026. Network with past participants and organizers.'
            },
            '2025-01-20': {
                title: 'Startup Pitch Night',
                location: 'Vienna, Austria',
                description: 'Present your startup idea to investors and receive valuable feedback from industry experts.'
            },
            '2025-01-25': {
                title: 'Tech Workshop: AI for Startups',
                location: 'Zurich, Switzerland',
                description: 'Hands-on workshop on implementing AI solutions in your startup. Limited seats available.'
            },
            '2025-02-10': {
                title: 'Networking Mixer DACH',
                location: 'Munich, Germany',
                description: 'Connect with founders, investors, and innovators from across the DACH region.'
            },
            '2025-02-15': {
                title: 'Funding Strategies Workshop',
                location: 'Salzburg, Austria',
                description: 'Learn effective strategies for securing funding for your startup from experienced investors.'
            },
            '2025-02-20': {
                title: 'Startup Nights Vienna',
                location: 'Vienna, Austria',
                description: 'Monthly networking event for startups, investors, and innovators in Vienna\'s tech scene.'
            },
            '2025-03-05': {
                title: 'Innovation Summit Tirol',
                location: 'Innsbruck, Austria',
                description: 'Annual summit showcasing the latest innovations from Tirol\'s startup ecosystem.'
            },
            '2025-03-10': {
                title: 'Swiss Startup Day',
                location: 'Zurich, Switzerland',
                description: 'Annual conference featuring keynotes from successful Swiss founders and investors.'
            },
            '2025-03-18': {
                title: 'Mentorship Matching Event',
                location: 'Vienna, Austria',
                description: 'Get matched with experienced mentors who can guide your startup journey.'
            }
        };

        let currentDate = new Date(2025, 0, 1);

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function generateCalendar() {
            const grid = document.getElementById('calendarGrid');
            const monthLabel = document.getElementById('currentMonth');
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            monthLabel.textContent = `${monthNames[month]} ${year}`;
            
            grid.innerHTML = '';
            
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            weekdays.forEach(day => {
                const weekdayEl = document.createElement('div');
                weekdayEl.className = 'calendar-weekday';
                weekdayEl.textContent = day;
                grid.appendChild(weekdayEl);
            });
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            for (let i = 0; i < firstDay; i++) {
                const emptyEl = document.createElement('div');
                emptyEl.className = 'calendar-day empty';
                grid.appendChild(emptyEl);
            }
            
            const today = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day';
                dayEl.textContent = day;
                
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayEl.classList.add('today');
                }
                
                if (events[dateKey]) {
                    dayEl.classList.add('has-event');
                    const line = document.createElement('div');
                    line.className = 'event-line';
                    dayEl.appendChild(line);
                    
                    dayEl.addEventListener('mouseenter', (e) => showEventPopup(e, dateKey));
                    dayEl.addEventListener('mouseleave', hideEventPopup);
                    dayEl.addEventListener('click', (e) => showEventPopup(e, dateKey));
                }
                
                grid.appendChild(dayEl);
            }
        }

        function showEventPopup(e, dateKey) {
            const popup = document.getElementById('eventPopup');
            const event = events[dateKey];
            
            if (!event) return;
            
            const [year, month, day] = dateKey.split('-');
            
            document.getElementById('popupDay').textContent = parseInt(day);
            document.getElementById('popupMonth').textContent = monthShort[parseInt(month) - 1];
            document.getElementById('popupTitle').textContent = event.title;
            document.getElementById('popupLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i><span>${event.location}</span>`;
            document.getElementById('popupDescription').textContent = event.description;
            
            const rect = e.target.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            
            let left = rect.left;
            let top = rect.bottom + 10;
            
            if (left + popupRect.width > window.innerWidth) {
                left = window.innerWidth - popupRect.width - 20;
            }
            if (top + popupRect.height > window.innerHeight) {
                top = rect.top - popupRect.height - 10;
            }
            
            popup.style.left = `${left}px`;
            popup.style.top = `${top}px`;
            popup.classList.add('visible');
        }

        function hideEventPopup() {
            const popup = document.getElementById('eventPopup');
            popup.classList.remove('visible');
        }

        function closePopup() {
            hideEventPopup();
        }

        function registerForEvent() {
            alert('Registration coming soon!');
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        }

        function scrollToFooter() {
            const footer = document.getElementById('footer');
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        window.addEventListener('scroll', () => {
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        document.addEventListener('click', (e) => {
            const popup = document.getElementById('eventPopup');
            const calendarDay = e.target.closest('.calendar-day');
            
            if (!popup.contains(e.target) && !calendarDay) {
                hideEventPopup();
            }
        });

        const scrollDown = document.querySelector('.scroll-down');
        scrollDown.addEventListener('mouseenter', () => {
            scrollDown.style.animationPlayState = 'paused';
        });
        
        scrollDown.addEventListener('mouseleave', () => {
            scrollDown.style.animationPlayState = 'running';
        });

        generateCalendar();

        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('More content coming soon!');
            });
        });

        document.querySelectorAll('.incubator-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Link coming soon!');
            });
        });

        document.querySelectorAll('.logo-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                if (!href || href === '#') {
                    e.preventDefault();
                    alert('Coming soon!');
                }
            });
        });