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
              <a href="#section1" onClick={()=>setSelectedOption(1)} className="hover:text-pallete-500">1. Εισαγωγή</a>
              <a href="#section2" onClick={()=>setSelectedOption(2)} className="hover:text-pallete-500">2. Δημιουργία Λογαριασμού/ Είσοδος στην υπηρεσία</a>              
              <a href="#section3" onClick={()=>setSelectedOption(3)} className="hover:text-pallete-500">3. Προφίλ Γονέα</a>
              <a href="#section4" onClick={()=>setSelectedOption(4)} className="hover:text-pallete-500">4. Προφίλ Επαγγελματία</a>
              <a href="#section5" onClick={()=>setSelectedOption(5)} className="hover:text-pallete-500">5. Αλλαγή Στοιχείων Λογαριασμού</a>
              <a href="#section6" onClick={()=>setSelectedOption(6)} className="hover:text-pallete-500">6. Ιστορικό</a>
              <a href="#section7" onClick={()=>setSelectedOption(7)} className="hover:text-pallete-500">7. Συμφωνία</a>
              <a href="#section8" onClick={()=>setSelectedOption(8)} className="hover:text-pallete-500">8. Πληρωμές</a>
              <a href="#section9" onClick={()=>setSelectedOption(9)} className="hover:text-pallete-500">9. Αποσύνδεση</a>
              <a href="#section10" onClick={()=>setSelectedOption(10)} className="hover:text-pallete-500">10. Υποστήριξη Πελατών</a>
              <a href="#section11"  onClick={()=>setSelectedOption(11)} className="hover:text-pallete-500">11. Πληροφορίες Ασφάλειας</a>
              <a href="#section12" onClick={()=>setSelectedOption(12)} className="hover:text-pallete-500">12. Ειδοποιήσεις</a>
              <a href="#section13" onClick={()=>setSelectedOption(13)} className="hover:text-pallete-500">13. Κριτικές και Βαθμολογίες</a>
              <a href="#section14" onClick={()=>setSelectedOption(14)} className="hover:text-pallete-500">14. Δυνατότητες για Επαγγελματίες</a>
              <a href="#section15" onClick={()=>setSelectedOption(15)} className="hover:text-pallete-500">15. Δυνατότητες για Γονείς</a>

            </div>
          </div>
          <div className="vertical-line"></div>
          <div className='w-5/6 h-full overflow-y-scroll '>
          <div id="section1" className='px-20 mt-10'>
            <p className={` ${selectedOption === 1 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>1. Εισαγωγή</p>
            <p >Το nanika είναι ίσως η καλύτερη πλατφόρμα που συνδέει γονείς που αναζητούν φροντίδα για τα παιδιά τους με επαγγελματίες που ψάχνουν δουλειά.
            Ως αρχική σελίδα παρουσιάζεται η σελίδα αναζήτησης επαγγελματία, όπου μπορείτε ως γονέας χωρίς να συνδεθείτε στην υπηρεσία, να ελέγξετε 
            την διαθεσιμότητα νταντάδων που αντιστοιχεί στα φίλτρα που επιλέξατε.</p>
            <p className='mt-5'><span className=' font-semibold'>Ως γονέας,</span> στο nanika θα βρείτε επαγγελματίες με αξιολογήσεις για να κρίνετε 
            τον κατάλληλο για τις ανάγκες σας. Μόλις βρείτε έναν επαγγελματία που σας έκανε καλή εντύπωση, μπορείτε να στείλετε αίτημα επικοινωνίας (απαιτεί είσοδο), 
            ώστε να μοιραστείτε μαζί του τα απαραίτητα στοιχεία για να επικοινωνήσει μαζί σας αν και αυτός ενδιαφέρεται.</p>
            <p className='mt-5'><span className=' font-semibold'>Ως επαγγελματίας,</span> μπορείτε να δημοσιεύσετε την αγγελία σας για να βρείτε εργασία και να δεχτείτε αιτήματα επικοινωνίας από γονείς που ενδιαφέρονται.</p>
            <p className='mt-5'> Για να συνεχίσετε ως επαγγελματίας πρέπει να κάνετε αντίστοιχη εγγραφή/είσοδο πατώντας το <span className=' font-semibold'>sign up/ login</span> ή το  <span className=' font-semibold'>Βρείτε Εργασία.</span></p>
          </div>

          <div id="section2" className='px-20 mt-10'>
            <p className={` ${selectedOption === 2 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}> 2. Δημιουργία Λογαριασμού/ Είσοδος στην υπηρεσία</p>
            <p>Με την επιλογή <span className='font-medium'>Sign Up</span> κατευθύνεστε σε ιστοσελίδα για να επιλέξετε αν ο λογαριασμός σας αντιστοιχεί σε επαγγελματία ή γονέα. Η δημιουργία λογαριασμού θα απαιτήσει να συμπληρώσετε πεδία όπως email, κωδικό και στη συνέχεια μέσω εισόδου από την σελίδα του gov.gr ανακτούνται τα προσωπικά στοιχεία σας (Ονοματεπώνυμο, ΑΜΚΑ,φύλο).</p>
            <p className='mt-5'>Με την επιλογή <span className='font-medium'>Login</span> κατευθύνεστε σε ιστοσελίδα για να συμπληρώσετε το email σας και τον κωδικό που εισάγατε κατά την εγγραφή σας στην υπηρεσία.</p>
          </div>

          <div id="section3" className='px-20 mt-10'>
              <p className={` ${selectedOption === 3 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>3. Προφίλ Γονέα</p>
              <p>Μπορείτε να επεξεργαστείτε το προφίλ σας επιλέγοντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>, οι οποίες βρίσκονται στο δεξί μέρος του header, πατώντας το βέλος.</p>
              <p>Πατώντας στο όνομα ή την φωτογραφία σας, μπορείτε να επισκεπτείτε το προφίλ σας, το οποίο θα γίνεται ορατό σε επαγγελματίες στους οποίους στέλνετε αίτημα επικοινωνίας αλλά και σε άλλους γονείς που διαβάζουν αξιολογήσεις που αφήνετε για κάποιον επαγγελματία με τον οποίο επιβεβαιωμένα συνεργαστήκατε.</p>
          </div>

          <div id="section4"className='px-20 mt-10'>
              <p className={` ${selectedOption === 4 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>4. Προφίλ Επαγγελματία</p>
              <p className=''>Μπορείτε να επεξεργαστείτε το προφίλ σας πατώντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>. Εκεί μετά την εγγραφή σας μπορείτε να προσθέσετε μια φωτογραφία σας, καθώς και μια σύντομη περιγραφή.</p>
              <p>Αφότου συνδεθείτε επιλέγοντας <span className='font-medium'>Αγγελίες, Ειδοποιήσεις, Αξιολογήσεις</span> μπορείτε να δείτε τις τρέχουσες φόρμες, τις μη οριστικοποιημένες αγγελίες σας και την επεξεργασία τους.</p>
              <p>Ένα πλήρως συμπληρωμένο προφίλ κερδίζει περισσότερη προσοχή από τους γονείς, καθώς δείχνει ότι είστε οργανωμένοι και αξιόπιστοι. Μην ξεχάσετε να προσθέσετε τις υπηρεσίες που προσφέρετε και να διατηρείτε το ημερολόγιό σας ενημερωμένο, ώστε να διευκολύνετε τους γονείς στην επιλογή τους.</p>
          </div>

          <div id="section5" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 5 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>5. Αλλαγή Στοιχείων Λογαριασμού</p>
              <p>Αφού έχετε συνδεθεί στην υπηρεσία μας μπορείτε να κάνετε αλλαγή των στοιχείων του λογαριασμού σας (εκτός των απαραίτητων στοιχείων για την ταυτοποίηση σας) πατώντας στο βέλος δίπλα από το προφίλ σας και στην συνέχεια “Ρυθμίσεις Λογαριασμού”.</p>
          </div>

          <div id="section6" className='px-20 mt-10'>
              <p className={` ${selectedOption === 6 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>6. Ιστορικό</p>
              <p>Για τους γονείς με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπησης παλαιότερων αιτήσεων, πληρωμών, αξιολογήσεων και επαγγελματιών με τους οποίους έχετε έρθει σε επικοινωνία.</p>
              <p>Για τους επαγγελματίες με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπησης παλιότερων αγγελιών, συμφωνητικών, πληρωμών και τα στοιχεία των γονέων με τους οποίους έχετε έρθει σε επικοινωνία.</p>
              <p>Αυτό σας βοηθά να έχετε πλήρη εικόνα των συναλλαγών σας και να βρίσκετε εύκολα ό,τι χρειάζεστε.</p>
          </div>

          <div id="section7" className='px-20 mt-10'>
              <p className={` ${selectedOption === 7 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>7. Συμφωνία</p>
              <p>Εφόσον έγινε επικοινωνία με τον επαγγελματία, ως γονέας πρέπει να στείλετε συμφωνητικό απασχόλησης στην οποία θα είναι ξεκάθαρη η σύμβαση ωρών, χρονικής περιόδου και μέρους. Περιμένετε την αποδοχή από τον επαγγελματία σαν υπογραφή του στην συμφωνία σας και η πρόσληψη ολοκληρώθηκε!</p>
              <p>Ως επαγγελματίας, μετά την επικοινωνία, περιμένετε το συμφωνητικό απασχόλησης στις Ειδοποιήσεις, επιβεβαιώστε πως είναι όπως συμφωνήσατε και η πρόσληψη σας ολοκληρώθηκε!</p>
          </div>

          <div id="section8" className='px-20 mt-10'>
              <p className={` ${selectedOption === 8 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>8. Πληρωμές</p>
              <p>Η πληρωμή γίνεται μέσω της παροχής κωδικού voucher από τον γονέα στον επαγγελματία. Στην συνέχεια ο επαγγελματίας ωφείλει να επιβεβαιώσει την παραλαβή του voucher, πατώντας “αποδοχή” στην ειδοποίηση.</p>
          </div>

          <div id="section9" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 9 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>9. Αποσύνδεση</p>
              <p>Αφού έχετε συνδεθεί στην υπηρεσία μας μπορείτε να αποσυνδεθείτε πατώντας στο βέλος δίπλα από το προφίλ σας και στην συνέχεια Αποσύνδεση.</p>
          </div>

          <div id="section10" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 10 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>10. Υποστήριξη Πελατών</p>
              <p className="text-lg text-gray-700 leading-relaxed">
              Είμαστε εδώ για να σας βοηθήσουμε με οποιαδήποτε απορία ή πρόβλημα! Μη διστάσετε να επικοινωνήσετε μαζί μας στην παρακάτω ηλεκτρονική διεύθυνση.
            </p>
            <p className="mt-4 text-lg font-medium text-gray-800"> 
              <a 
                href="mailto:nanika@gmail.com" 
                className=" hover:text-pallete-600 transition duration-200"
              >
                nanika@gmail.com
              </a>
            </p>
            <p className="mt-2 text-lg text-gray-600">
              Ωράριο λειτουργίας: Δευτέρα έως Παρασκευή, 09:00 - 17:00
            </p>
          </div>

          <div id="section11" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 11 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>11. Πληροφορίες Ασφάλειας</p>
              <p>Για την επιβεβαίωση της ταυτότητας, συνεργαζόμαστε με την πλατφόρμα του gov.gr, εξασφαλίζοντας την αξιοπιστία των στοιχείων που χρησιμοποιούνται στην υπηρεσία μας. 
                Τα προσωπικά σας δεδομένα χρησιμοποιούνται αποκλειστικά για τη λειτουργία της πλατφόρμας και δεν κοινοποιούνται ποτέ σε τρίτους χωρίς τη συγκατάθεσή σας.
                <br /> <br /> Σας συνιστούμε να επιλέγετε ισχυρούς κωδικούς πρόσβασης και να αποφεύγετε τη χρήση του ίδιου κωδικού σε άλλες πλατφόρμες. 
                Εάν παρατηρήσετε οποιαδήποτε ύποπτη δραστηριότητα στον λογαριασμό σας, παρακαλούμε να επικοινωνήσετε άμεσα με την υποστήριξη πελατών μας.     .</p>
          </div>

          <div id="section12" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 12 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>12. Ειδοποιήσεις</p>
              <p className="text-base leading-relaxed">
                Στην πλατφόρμα, οι επαγγελματίες λαμβάνουν ειδοποιήσεις για να παραμένουν ενήμεροι σχετικά με αιτήματα και ενέργειες από γονείς. Υπάρχουν τέσσερα βασικά είδη ειδοποιήσεων:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Αίτημα Επικοινωνίας:</span> Όταν ένας γονέας ενδιαφέρεται να επικοινωνήσει με έναν επαγγελματία, στέλνει αίτημα επικοινωνίας. Ο επαγγελματίας μπορεί να αποδεχτεί ή να απορρίψει το αίτημα ανάλογα με τη διαθεσιμότητά του.
                </li>
                <li>
                  <span className="font-semibold">Λήξη Συνεργασίας:</span> Αυτή η ειδοποίηση ενημερώνει τον επαγγελματία ότι μια συνεργασία με έναν γονέα έχει ολοκληρωθεί. Είναι χρήσιμη για την παρακολούθηση του ιστορικού συνεργασιών.
                </li>
                <li>
                  <span className="font-semibold">Συμφωνητικό Απασχόλησης:</span> Όταν ένας γονέας στέλνει το συμφωνητικό για συγκεκριμένη εργασία, ο επαγγελματίας λαμβάνει σχετική ειδοποίηση. Έχει τη δυνατότητα να αποδεχτεί ή να απορρίψει το συμφωνητικό με βάση τις ανάγκες και τη διαθεσιμότητά του.
                </li>
                <li>
                  <span className="font-semibold">Αποστολή Κωδικού Voucher:</span> Για την πληρωμή των υπηρεσιών, οι γονείς αποστέλλουν κωδικό voucher στους επαγγελματίες. Με τη λήψη αυτής της ειδοποίησης, ο επαγγελματίας πρέπει να επιβεβαιώσει την παραλαβή του κωδικού για να ολοκληρωθεί η διαδικασία πληρωμής.
                </li>
              </ul>
              
              <p className="text-base leading-relaxed">
                <br />Αντίστοιχα, οι γονείς λαμβάνουν ειδοποιήσεις για να παρακολουθούν αιτήματα, συνεργασίες και πληρωμές με επαγγελματίες. Υπάρχουν έξι βασικά είδη ειδοποιήσεων:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Αποδοχή Αιτήματος Επικοινωνίας:</span> Ενημερώνεστε όταν ένας επαγγελματίας αποδεχτεί το αίτημα επικοινωνίας που του στείλατε, επιτρέποντάς σας να προχωρήσετε στη συνεργασία.
                </li>
                <li>
                  <span className="font-semibold">Λήξη Συνεργασίας:</span> Λαμβάνετε ενημέρωση ότι η συνεργασία σας με έναν επαγγελματία ολοκληρώθηκε, ώστε να γνωρίζετε πότε έληξε η συμφωνία.
                </li>
                <li>
                  <span className="font-semibold">Απόρριψη Συμφωνητικού Απασχόλησης:</span> Ενημερώνεστε όταν ένας επαγγελματίας απορρίψει το συμφωνητικό απασχόλησης που του στείλατε, διευκολύνοντάς σας να αναζητήσετε άλλες επιλογές.
                </li>
                <li>
                  <span className="font-semibold">Αποδοχή Συμφωνητικού Απασχόλησης:</span> Ενημερώνεστε όταν ένας επαγγελματίας αποδεχτεί το συμφωνητικό απασχόλησης που του στείλατε, ενημερώνοντας σας πως η συνεργασία έγινε επίσημη.
                </li>
                <li>
                  <span className="font-semibold">Απόρριψη Αιτήματος Επικοινωνίας:</span> Ενημερώνεστε όταν ένας επαγγελματίας απορρίψει το αίτημα επικοινωνίας σας.
                </li>
                <li>
                  <span className="font-semibold">Επιβεβαίωση Λήψης Voucher:</span> Λαμβάνετε ειδοποίηση όταν ένας επαγγελματίας επιβεβαιώσει την παραλαβή του κωδικού voucher που του αποστείλατε, ολοκληρώνοντας τη διαδικασία πληρωμής.
                </li>
              </ul>
          </div>

          <div id="section13" className='px-20 mt-10 mb-10'>
              <p className={` ${selectedOption === 13 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>13. Κριτικές και Αξιολογήσεις</p>
              <p>Μετά την λήξη της απασχόλησης ενός επαγγελματία μπορεί ο γονιός να κάνει κριτική για τις υπηρεσίες του. Πατώντας στην ειδοποίηση μπορεί να αξιολογήσει τον επαγγελματία
                και να γράψει αξιοσημείωτα στοιχεία σχετικά με την συνεργασία τους. Ως επαγγελματίας μπορείτε να δείτε προηγούμενες αξιολογήσεις πατώντας
                την επιλογή "Αξιολογήσεις" και στο Προφίλ σας εμφανίζονται οι πιο πρόσφατες.</p>
          </div>

          <div id="section14" className='px-20 mt-10 mb-10'>
            <p className={` ${selectedOption === 14 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>14. Δυνατότητες για Επαγγελματίες</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Δημιουργία Πλήρους Προφίλ:</span> Συμπληρώστε το προφίλ σας με φωτογραφία, περιγραφή και τις υπηρεσίες που προσφέρετε. Ένα πλήρες προφίλ αυξάνει τις πιθανότητες να σας επιλέξουν οι γονείς.
              </li>
              <li>
                <span className="font-semibold">Διαχείριση Διαθεσιμότητας:</span> Ενημερώστε το ημερολόγιό σας για να δείξετε τις ημέρες και ώρες που είστε διαθέσιμος/-η.
              </li>
              <li>
                <span className="font-semibold">Λήψη Αιτημάτων Επικοινωνίας:</span> Δεχτείτε αιτήματα από γονείς που ενδιαφέρονται για τις υπηρεσίες σας και επιλέξτε αν θέλετε να προχωρήσετε σε συνεργασία.
              </li>
              <li>
                <span className="font-semibold">Αγγελίες και Προβολή Υπηρεσιών:</span> Δημοσιεύστε αγγελίες για να αναδείξετε τις δεξιότητες και την εμπειρία σας.
              </li>
              <li>
                <span className="font-semibold">Αξιολογήσεις και Βαθμολογίες:</span> Λάβετε αξιολογήσεις από γονείς με τους οποίους συνεργαστήκατε, ώστε να ενισχύσετε την αξιοπιστία σας.
              </li>
              <li>
                <span className="font-semibold">Εύκολες Πληρωμές:</span> Λάβετε πληρωμές μέσω κωδικών voucher, εξασφαλίζοντας ασφάλεια και διαφάνεια στις συναλλαγές.
              </li>
            </ul>  
          </div>

          <div id="section15" className='px-20 mt-10 mb-10'>
            <p className={` ${selectedOption === 15 ? 'text-pallete-800' : ''} font-semibold text-xl mb-2`}>15. Δυνατότητες για Γονείς</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Αναζήτηση Επαγγελματιών:</span> Χρησιμοποιήστε φίλτρα (π.χ. τοποθεσία, διαθεσιμότητα, αξιολογήσεις) για να βρείτε επαγγελματίες που ταιριάζουν στις ανάγκες σας.
              </li>
              <li>
                <span className="font-semibold">Αιτήματα Επικοινωνίας:</span> Στείλτε αιτήματα επικοινωνίας σε επαγγελματίες που σας ενδιαφέρουν και συζητήστε τις λεπτομέρειες της συνεργασίας σας.
              </li>
              <li>
                <span className="font-semibold">Αξιολόγηση Επαγγελματιών:</span> Αφήστε αξιολογήσεις για τους επαγγελματίες με τους οποίους συνεργαστήκατε, βοηθώντας άλλους γονείς να κάνουν την καλύτερη επιλογή.
              </li>
              <li>
                <span className="font-semibold">Διαχείριση Συνεργασιών:</span> Παρακολουθήστε τις ενεργές και παλαιότερες συνεργασίες σας μέσω του ιστορικού.
              </li>
              <li>
                <span className="font-semibold">Ασφαλείς Πληρωμές:</span> Πραγματοποιήστε πληρωμές μέσω κωδικών voucher, εξασφαλίζοντας ασφάλεια και διαφάνεια.
              </li>
              <li>
                <span className="font-semibold">Λήψη Ειδοποιήσεων:</span> Λαμβάνετε ενημερώσεις για την πρόοδο των αιτημάτων σας, τις συνεργασίες και τις πληρωμές.
              </li>
            </ul>
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
