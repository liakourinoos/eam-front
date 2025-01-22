import { useState, useEffect } from 'react';
import Footer from './generic components/Footer.jsx';
import Header from './generic components/Header.jsx';
import './App.css';
import { useAuth } from './customHooks.jsx';
import { RenderHeaderNavbar } from '../global_assets/global_functions.jsx';

function App() {
  const { userData, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  const handleScroll = () => {
    const sectionDiv = document.querySelector('.w-3/4');
    if (sectionDiv && window.scrollY > sectionDiv.offsetTop) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  useEffect(() => {
    // Listen to the scroll event
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [selectedOption, setSelectedOption] = useState(0)
  useEffect(() => {
    if (selectedOption > 0) {
      // set a timer of 1 second to change its value back to 0
      const timer = setTimeout(() => {
        setSelectedOption(0)
      }, 700);
    }
  }, [selectedOption])
  if (loading)
    return (
      <div className='w-full h-screen flex justify-center items-center bg-white'>
        <span className='text-3xl font-bold'>Φόρτωση...</span>
      </div>
    )



  if (!loading)
    return (
      <div className='w-full h-screen flex flex-col justify-between bg-white'>
        {RenderHeaderNavbar(userData, 0)}
        {/* main page */}
        <div className="w-full h-full overflow-hidden flex-grow flex relative bg-white">
          {/* contents */}
          <div className='w-1/6 flex flex-col items-center  '>
            <p className=' text-3xl font-bold text-pallete-800 mt-5 mb-2'>Εγχειρίδιο Χρήσης</p>
            <div className='w-5/6  rounded-md  py-2 pl-3 flex flex-col gap-2 text-lg font-medium bg-white'>
              <p className='underline -ml-3 text-2xl'>Περιεχόμενα</p>
                <a href="#section1" onClick={() => setSelectedOption(1)} className="hover:text-pallete-800">1. Εισαγωγή</a>
                <a href="#section2" onClick={() => setSelectedOption(2)} className="hover:text-pallete-800 flex gap-1">2. <p className=''>Δημιουργία Λογαριασμού / Είσοδος στην υπηρεσία</p></a>
                <a href="#section3" onClick={() => setSelectedOption(3)} className="hover:text-pallete-800">3. Προφίλ Γονέα</a>
                <a href="#section4" onClick={() => setSelectedOption(4)} className="hover:text-pallete-800">4. Προφίλ Επαγγελματία</a>
                <a href="#section5" onClick={() => setSelectedOption(5)} className="hover:text-pallete-800">5. Ιστορικό</a>
                <a href="#section6" onClick={() => setSelectedOption(6)} className="hover:text-pallete-800">6. Συμφωνία</a>
                <a href="#section7" onClick={() => setSelectedOption(7)} className="hover:text-pallete-800">7. Πληρωμές</a>
                <a href="#section8" onClick={() => setSelectedOption(8)} className="hover:text-pallete-800">8. Αποσύνδεση</a>

            </div>
          </div>
          <div class="vertical-line"></div>
          <div className='w-5/6 h-full overflow-y-scroll '>
            <div id="section1" className='px-10 mt-10'>
              <p className={` ${selectedOption === 1 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>1. Εισαγωγή</p>
              <p >Το nanika είναι ίσως η καλύτερη πλατφόρμα που συνδέει γονείς που αναζητούν φροντίδα για τα παιδιά τους με επαγγελματίες που ψάχνουν δουλειά.
                Ως αρχική σελίδα παρουσιάζεται η σελίδα αναζήτησης επαγγελματία, όπου μπορείτε ως γονέας χωρίς να συνδεθείτε στην υπηρεσία, να ελέγξετε
                την διαθεσιμότητα νταντάδων που αντιστοιχεί στα φίλτρα που επιλέξατε.</p>

              <p className='mt-5'><span className=' font-semibold'>Ως γονέας,</span> στο nanika θα βρείτε επαγγελματίες με αξιολογήσεις για να κρίνετε
                τον κατάλληλο για τις ανάγκες σας. Μόλις βρείτε έναν επαγγελματία που σας έκανε καλή εντύπωση, μπορείτε να στείλετε αίτημα επικοινωνίας (απαιτεί είσοδο),
                ώστε να μοιραστείτε μαζί του τα απαραίτητα στοιχεία για να επικοινωνήσει μαζί σας αν και αυτός ενδιαφέρεται.</p>

              <p className='mt-5'><span className=' font-semibold'>Ως επαγγελματίας,</span> μπορείτε να δημοσιεύσετε την αγγελία σας για να βρείτε εργασία και να δεχτείτε αιτήματα επικοινωνίας από γονείς που ενδιαφέρονται.</p>

              {/* <p className='mt-5'> Για να συνεχίσετε ως επαγγελματίας πρέπει να κάνετε αντίστοιχη εγγραφή/είσοδο πατώντας το <span className=' font-semibold'>sign up/ login.</span></p> */}
            </div>

            <div id="section2" className='px-10 mt-10'>
              <p className={` ${selectedOption === 2 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}> 2. Δημιουργία Λογαριασμού/ Είσοδος στην υπηρεσία</p>


              <p>Με την επιλογή <span className='font-medium'>Sign Up</span> κατευθύνεστε σε ιστοσελίδα για να επιλέξετε αν ο λογαριασμός σας αντιστοιχεί σε επαγγελματία ή γονέα. Η δημιουργία λογαριασμού θα απαιτήσει να συμπληρώσετε πεδία όπως email,κωδικό και στη συνέχεια μέσω εισόδου από την σελίδα του gov.gr ανακτούνται τα προσωπικά στοιχεία σας (ονοματεπώνυμο, ΑΜΚΑ).</p>

              <p className='mt-5'>Με την επιλογή <span className='font-medium'>Login</span> κατευθύνεστε σε ιστοσελίδα για να συμπληρώσετε το email σας και τον κωδικό που εισάγατε κατά την εγγραφή σας στην υπηρεσία.</p>

            </div>

            <div id="section3" className='px-10 mt-10'>
              <p className={` ${selectedOption === 3 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>3. Προφίλ Γονέα</p>
              <p>Πατώντας στο όνομα ή την φωτογραφία σας, μπορείτε να επισκεπτείτε το προφίλ σας, το οποίο θα γίνεται ορατό σε επαγγελματίες στους οποίους στέλνετε αίτημα επικοινωνίας αλλά και σε άλλους γονείς που διαβάζουν αξιολογήσεις που αφήνετε για κάποιον επαγγελματία με τον οποίο επιβεβαιωμένα συνεργαστήκατε.</p>

              <p className='mt-3'>Μπορείτε να επεξεργαστείτε το προφίλ σας επιλέγοντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>, οι οποίες βρίσκονται στο πάνω δεξιά μέρος της σελίδας, πατώντας το βέλος.</p>
            </div>

            <div id="section4" className='px-10 mt-10'>
              <p className={` ${selectedOption === 4 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>4. Προφίλ Επαγγελματία</p>
              <p className=''>Μπορείτε να επεξεργαστείτε το προφίλ σας πατώντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>. Εκεί μετά την εγγραφή σας μπορείτε να προσθέσετε μια φωτογραφία σας, καθώς και μια σύντομη περιγραφή.</p>
              <p>Αφότου συνδεθείτε επιλέγοντας <span className='font-medium'>Αγγελίες, Ειδοποιήσεις, Αξιολογήσεις</span> μπορείτε να δείτε τις τρέχουσες φόρμες, τις μη οριστικοποιημένες αγγελίες σας και την επεξεργασία τους.</p>
              <p>Ένα πλήρως συμπληρωμένο προφίλ κερδίζει περισσότερη προσοχή από τους γονείς, καθώς δείχνει ότι είστε οργανωμένοι και αξιόπιστοι. Μην ξεχάσετε να προσθέσετε τυχόν εξοικιώσεις που έχετε και να διατηρείτε το ημερολόγιό σας ενημερωμένο, ώστε να διευκολύνετε τους γονείς στην επιλογή τους.</p>
            </div>

            <div id="section5" className='px-10 mt-10'>
              <p className={` ${selectedOption === 5 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>5. Ιστορικό</p>
              <p>Για τους γονείς με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπισης παλαιότερων αιτήσεων, πληρωμών, αξιολογήσεων και επαγγελματιών με τους οποίους έχετε έρθει σε επικοινωνία.</p>
              <p>Για τους επαγγελματίες με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπισης παλιότερων αγγελιών, συμφωνητικών, πληρωμών και τα στοιχεία των γονέων με τους οποίους έχετε έρθει σε επικοινωνία.</p>
              <p>Αυτό σας βοηθά να έχετε πλήρη εικόνα των συναλλαγών σας και να βρίσκετε εύκολα ό,τι χρειάζεστε.</p>
            </div>

            <div id="section6" className='px-10 mt-10'>
              <p className={` ${selectedOption === 6 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>6. Συμφωνία</p>
              <p>Εφόσον έγινε επικοινωνία με τον επαγγελματία, ως γονέας πρέπει να στείλετε αίτηση απασχόλησης στην οποία θα είναι ξεκάθαρη η σύμβαση ωρών, χρονικής περιόδου και μέρους. Περιμένετε την αποδοχή από τον επαγγελματία σαν υπογραφή του στην συμφωνία σας και η πρόσληψη ολοκληρώθηκε!</p>
              <p>Ως επαγγελματίας, μετά την επικοινωνία, περιμένετε την αίτηση απασχόλησης, επιβεβαιώστε πως είναι όπως συμφωνήσατε και η πρόσληψη σας ολοκληρώθηκε!</p>
            </div>

            <div id="section7" className='px-10 mt-10'>
              <p className={` ${selectedOption === 7 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>7. Πληρωμές</p>
              <p>Η πληρωμή γίνεται μέσω της παροχής κωδικού voucher από τον γονέα στον επαγγελματία. Στην συνέχεια ο επαγγελματίας ωφείλει να επιβεβαιώσει την παραλαβή του voucher, πατώντας “αποδοχή” στην ειδοποίηση.</p>
            </div>

            <div id="section8" className='px-10 mt-10 mb-10'>
              <p className={` ${selectedOption === 8 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>8. Αποσύνδεση</p>
              <p>Αφού έχετε συνδεθεί στην υπηρεσία μας μπορείτε να αποσυνδεθείτε πατώντας στο βέλος δίπλα από το προφίλ σας και στην συνέχεια Αποσύνδεση.</p>
            </div>

            {/* Scroll to top button */}
            {isVisible && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-20 right-8 p-4 bg-blue-800 text-white size-16 flex items-center justify-center text-2xl font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
              >
                ↑
              </button>
            )}
          </div>







        </div>


        <Footer />
      </div>
    );
}

export default App;
