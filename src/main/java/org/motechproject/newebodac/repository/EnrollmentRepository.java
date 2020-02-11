package org.motechproject.newebodac.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;
import org.springframework.stereotype.Repository;

@Repository
public class EnrollmentRepository {

  private static final String MESSAGE_KEY = "messageKey";
  private static final String MESSAGE_ID = "id";
  private static final String SEND_FOR_ACTUAL_DATE = "sendForActualDate";
  private static final String VISIT_TYPE = "visitType";
  private static final String VISITS = "visits";
  private static final String VACCINEE = "vaccinee";
  private static final String DATE = "date";
  private static final String PLANNED_DATE = "plannedDate";
  private static final String TIME_OFFSET = "timeOffset";
  private static final String STATUS = "status";
  private static final String PREFERRED_LANGUAGE = "preferredLanguage";

  private final EntityManager em;
  private final CriteriaBuilder cb;

  public EnrollmentRepository(EntityManager em) {
    this.em = em;
    this.cb = em.getCriteriaBuilder();
  }

  /**
   * Return list of vaccinee fields for all of the IVR messages that should be send.
   * @param vaccineeFields list of Vaccinee fields that should be returned
   * @return list of vaccinee fields for all of the messages that should be send
   */
  public List<Map<String, Object>> getDataForIvrMessage(Set<String> vaccineeFields) {
    CriteriaQuery<Tuple> criteria = cb.createTupleQuery();
    Root<CampaignMessage> root = criteria.from(CampaignMessage.class);
    Path<UUID> messageId = root.get(MESSAGE_ID);

    List<Selection<?>> selectFields = new ArrayList<>();
    selectFields.add(messageId.alias(MESSAGE_ID));

    List<Expression<?>> groupByFields = new ArrayList<>();
    groupByFields.add(messageId);

    Join<CampaignMessage, VisitType> visitTypeJoin = root.join(VISIT_TYPE, JoinType.LEFT);
    Join<VisitType, Visit> visitJoin = visitTypeJoin.join(VISITS, JoinType.LEFT);
    Join<Visit, Vaccinee> vaccineeJoin = visitJoin.join(VACCINEE, JoinType.LEFT);
    vaccineeJoin.join(PREFERRED_LANGUAGE, JoinType.LEFT);

    vaccineeFields.forEach(field -> {
      Path<?> path = vaccineeJoin.get(field);
      selectFields.add(path.alias(field));
      groupByFields.add(path);
    });

    Path<Boolean> sendForActualDateField = root.get(SEND_FOR_ACTUAL_DATE);
    Path<Integer> timeOffset = root.get(TIME_OFFSET);
    Path<EnrollmentStatus> status = visitJoin.get(STATUS);
    Path<LocalDate> actualDate = visitJoin.get(DATE);
    Path<LocalDate> plannedDate = visitJoin.get(PLANNED_DATE);

    criteria.multiselect(selectFields);

    criteria.where(cb.and(cb.equal(status, EnrollmentStatus.ENROLLED),
        cb.or(cb.isTrue(sendForActualDateField),
            cb.equal(calculateTimeOffset(plannedDate), timeOffset)),
        cb.or(cb.isFalse(sendForActualDateField),
            cb.equal(calculateTimeOffset(actualDate), timeOffset))));

    criteria.groupBy(groupByFields);

    List<Tuple> results = em.createQuery(criteria).getResultList();

    List<Map<String, Object>> records = new ArrayList<>();

    results.forEach(tuple -> {
      Map<String, Object> values = new HashMap<>();
      values.put(MESSAGE_KEY, tuple.get(MESSAGE_ID));

      vaccineeFields.forEach(field -> {
        values.put(field, tuple.get(field));
      });

      records.add(values);
    });

    return records;
  }

  private Expression<Integer> calculateTimeOffset(Path<LocalDate> date) {
    return cb.function("DATEDIFF", Integer.class, cb.currentDate(), date);
  }
}
